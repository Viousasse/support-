<?php

namespace Tests\Feature\Tickets;

use App\Livewire\Tickets\TicketForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Layers\Tickets\Actions\AttachFileToTicket;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Ticket;
use Livewire\Livewire;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketAttachmentTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_stores_the_file_and_records_the_attachment(): void
    {
        Storage::fake(AttachFileToTicket::DISK);

        $requester = $this->userWithPermissions(TicketPermission::ViewOwn, TicketPermission::Create);
        $ticket = Ticket::factory()->create(['requester_id' => $requester->getKey()]);

        Livewire::actingAs($requester)
            ->test(TicketForm::class, ['ticket' => $ticket])
            ->set('attachment', UploadedFile::fake()->create('specification.pdf', 64, 'application/pdf'))
            ->call('attach')
            ->assertHasNoErrors();

        $attachment = Attachment::query()->sole();

        $this->assertSame('specification.pdf', $attachment->name);
        $this->assertSame($ticket->getKey(), $attachment->ticket_id);
        $this->assertSame($requester->getKey(), $attachment->uploaded_by_id);
        Storage::disk(AttachFileToTicket::DISK)->assertExists($attachment->path);
    }

    #[Test]
    public function it_refuses_a_file_larger_than_the_limit(): void
    {
        Storage::fake(AttachFileToTicket::DISK);

        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);
        $ticket = Ticket::factory()->create(['requester_id' => $requester->getKey()]);

        Livewire::actingAs($requester)
            ->test(TicketForm::class, ['ticket' => $ticket])
            ->set('attachment', UploadedFile::fake()->create('huge.pdf', 6144, 'application/pdf'))
            ->call('attach')
            ->assertHasErrors('attachment');

        $this->assertSame(0, Attachment::query()->count());
    }

    #[Test]
    public function it_refuses_an_upload_on_a_ticket_outside_the_perimeter(): void
    {
        Storage::fake(AttachFileToTicket::DISK);

        $stranger = $this->userWithPermissions(TicketPermission::ViewOwn);
        $ticket = Ticket::factory()->create();

        Livewire::actingAs($stranger)
            ->test(TicketForm::class, ['ticket' => $ticket])
            ->set('attachment', UploadedFile::fake()->create('specification.pdf', 64, 'application/pdf'))
            ->call('attach')
            ->assertForbidden();

        $this->assertSame(0, Attachment::query()->count());
    }

    #[Test]
    public function it_exposes_the_attachments_through_the_api(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = Ticket::factory()->create();
        $attachment = Attachment::factory()->create(['ticket_id' => $ticket->getKey()]);

        $response = $this->actingAs($manager, 'sanctum')
            ->postJson(route('tickets.search'), [
                'search' => ['includes' => [['relation' => 'attachments']]],
            ])
            ->assertSuccessful();

        $this->assertSame(
            $attachment->name,
            $response->json('data.0.attachments.0.name'),
        );
        $this->assertArrayNotHasKey('path', $response->json('data.0.attachments.0'));
    }
}
