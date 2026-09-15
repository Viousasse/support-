<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketTransitionTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_answers_with_a_conflict_on_an_illegal_transition(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Close);
        $ticket = Ticket::factory()->create();

        $this->actingAs($manager, 'sanctum')
            ->postJson(route('tickets.close', ['ticket' => $ticket]))
            ->assertStatus(Response::HTTP_CONFLICT);

        $this->assertSame(TicketStatus::Open, $ticket->fresh()->status);
    }

    #[Test]
    public function it_unassigns_a_ticket_back_to_open(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $ticket = Ticket::factory()->assigned()->create();

        $this->actingAs($manager, 'sanctum')
            ->postJson(route('tickets.unassign', ['ticket' => $ticket]))
            ->assertNoContent();

        $this->assertSame(TicketStatus::Open, $ticket->fresh()->status);
        $this->assertNull($ticket->fresh()->assigned_technician_id);
    }

    #[Test]
    public function it_walks_the_whole_lifecycle(): void
    {
        $manager = $this->userWithPermissions(
            TicketPermission::ViewAny,
            TicketPermission::Assign,
            TicketPermission::Close,
        );
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        $this->actingAs($manager, 'sanctum');

        $this->postJson(route('tickets.assign', ['ticket' => $ticket, 'technician' => $technician]))
            ->assertNoContent();
        $this->postJson(route('tickets.start-work', ['ticket' => $ticket]))->assertNoContent();
        $this->postJson(route('tickets.resolve', ['ticket' => $ticket]))->assertNoContent();
        $this->postJson(route('tickets.close', ['ticket' => $ticket]))->assertNoContent();

        $this->assertSame(TicketStatus::Closed, $ticket->fresh()->status);
    }
}
