<?php

namespace Tests\Feature\Extensions;

use App\Livewire\Tickets\TicketImportForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Layers\Tickets\Actions\StartTicketImport;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Jobs\ImportTicketsFromCsv;
use Layers\Tickets\Models\TicketImport;
use Livewire\Livewire;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketImportFormTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_stores_the_file_and_queues_the_import(): void
    {
        Queue::fake();
        Storage::fake(StartTicketImport::DISK);

        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);

        Livewire::actingAs($requester)
            ->test(TicketImportForm::class)
            ->set('csv', UploadedFile::fake()->createWithContent('tickets.csv', "title,description,priority,requester_email\nA,B,low,a@b.test"))
            ->call('import')
            ->assertHasNoErrors();

        $import = TicketImport::query()->sole();

        $this->assertSame($requester->getKey(), $import->uploaded_by_id);
        Storage::disk(StartTicketImport::DISK)->assertExists($import->path);
        Queue::assertPushed(ImportTicketsFromCsv::class);
    }

    #[Test]
    public function it_refuses_a_file_that_is_not_a_csv(): void
    {
        Queue::fake();
        Storage::fake(StartTicketImport::DISK);

        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);

        Livewire::actingAs($requester)
            ->test(TicketImportForm::class)
            ->set('csv', UploadedFile::fake()->create('tickets.pdf', 8, 'application/pdf'))
            ->call('import')
            ->assertHasErrors('csv');

        $this->assertSame(0, TicketImport::query()->count());
        Queue::assertNothingPushed();
    }

    #[Test]
    public function it_refuses_an_import_without_the_create_permission(): void
    {
        Queue::fake();
        Storage::fake(StartTicketImport::DISK);

        $user = $this->userWithPermissions(TicketPermission::ViewOwn);

        Livewire::actingAs($user)
            ->test(TicketImportForm::class)
            ->set('csv', UploadedFile::fake()->createWithContent('tickets.csv', 'title,description,priority,requester_email'))
            ->call('import')
            ->assertForbidden();

        $this->assertSame(0, TicketImport::query()->count());
    }
}
