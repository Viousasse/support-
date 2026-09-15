<?php

namespace Tests\Feature\Tickets;

use App\Livewire\Tickets\TicketForm;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use Livewire\Livewire;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketFormTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_a_ticket_from_the_interface(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);
        $title = faker()->sentences(sentences: 1);

        Livewire::actingAs($requester)
            ->test(TicketForm::class)
            ->set('title', $title)
            ->set('description', faker()->paragraphs(paragraphs: 1))
            ->set('priority', TicketPriority::High->value)
            ->call('save')
            ->assertHasNoErrors();

        $this->assertDatabaseHas('tickets', [
            'title' => $title,
            'requester_id' => $requester->getKey(),
        ]);
    }

    #[Test]
    public function it_refuses_an_empty_title_and_an_unknown_priority(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);

        Livewire::actingAs($requester)
            ->test(TicketForm::class)
            ->set('title', '')
            ->set('description', '')
            ->set('priority', 'urgent')
            ->call('save')
            ->assertHasErrors(['title', 'description', 'priority']);

        $this->assertSame(0, Ticket::query()->count());
    }

    #[Test]
    public function it_refuses_a_creation_without_the_create_permission(): void
    {
        $user = $this->userWithPermissions(TicketPermission::ViewOwn);

        Livewire::actingAs($user)
            ->test(TicketForm::class)
            ->set('title', faker()->sentences(sentences: 1))
            ->set('description', faker()->paragraphs(paragraphs: 1))
            ->set('priority', TicketPriority::Low->value)
            ->call('save')
            ->assertForbidden();

        $this->assertSame(0, Ticket::query()->count());
    }

    #[Test]
    public function it_assigns_a_ticket_from_the_interface(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        Livewire::actingAs($manager)
            ->test(TicketForm::class, ['ticket' => $ticket])
            ->set('technicianId', $technician->getKey())
            ->call('assign')
            ->assertHasNoErrors();

        $this->assertSame(TicketStatus::Assigned, $ticket->fresh()->status);
    }

    #[Test]
    public function it_refuses_an_assignment_without_the_assign_permission(): void
    {
        $user = $this->userWithPermissions(TicketPermission::ViewAny);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        Livewire::actingAs($user)
            ->test(TicketForm::class, ['ticket' => $ticket])
            ->set('technicianId', $technician->getKey())
            ->call('assign')
            ->assertForbidden();

        $this->assertSame(TicketStatus::Open, $ticket->fresh()->status);
    }

    #[Test]
    public function it_turns_an_illegal_transition_into_a_user_message(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->withStatus(TicketStatus::Closed)->create();

        Livewire::actingAs($manager)
            ->test(TicketForm::class, ['ticket' => $ticket])
            ->set('technicianId', $technician->getKey())
            ->call('assign')
            ->assertHasErrors('ticket')
            ->assertSuccessful();

        $this->assertSame(TicketStatus::Closed, $ticket->fresh()->status);
    }
}
