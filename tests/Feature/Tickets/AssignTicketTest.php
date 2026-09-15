<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Layers\Tickets\Actions\AssignTicket;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Listeners\SendTicketAssignedNotification;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Notifications\TicketAssignedNotification;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class AssignTicketTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_announces_the_assignment(): void
    {
        Event::fake();

        $ticket = Ticket::factory()->create();
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);

        app(AssignTicket::class)->execute($ticket, $technician);

        Event::assertDispatched(TicketAssigned::class);
        $this->assertSame(TicketStatus::Assigned, $ticket->fresh()->status);
        $this->assertSame($technician->getKey(), $ticket->fresh()->assigned_technician_id);
    }

    #[Test]
    public function it_notifies_the_assigned_technician(): void
    {
        Notification::fake();

        $ticket = Ticket::factory()->create();
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);

        app(SendTicketAssignedNotification::class)
            ->handle(new TicketAssigned($ticket, $technician));

        Notification::assertSentTo($technician, TicketAssignedNotification::class);
    }

    #[Test]
    public function it_assigns_a_ticket_through_the_api(): void
    {
        Notification::fake();

        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        $this->actingAs($manager, 'sanctum')
            ->postJson(route('tickets.assign', ['ticket' => $ticket, 'technician' => $technician]))
            ->assertNoContent();

        $this->assertSame(TicketStatus::Assigned, $ticket->fresh()->status);
        Notification::assertSentTo($technician, TicketAssignedNotification::class);
    }

    #[Test]
    public function it_refuses_an_assignment_without_the_assign_permission(): void
    {
        $user = $this->userWithPermissions(TicketPermission::ViewAny);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        $this->actingAs($user, 'sanctum')
            ->postJson(route('tickets.assign', ['ticket' => $ticket, 'technician' => $technician]))
            ->assertForbidden();

        $this->assertSame(TicketStatus::Open, $ticket->fresh()->status);
    }
}
