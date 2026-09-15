<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use Layers\Tickets\Actions\ResolveTicket;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Jobs\CalculateTicketResolutionTime;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class CalculateTicketResolutionTimeTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_marks_the_target_as_met_when_the_ticket_is_resolved_in_time(): void
    {
        $ticket = Ticket::factory()->create([
            'priority' => TicketPriority::High,
            'status' => TicketStatus::Resolved,
            'created_at' => now()->subHours(6),
            'resolved_at' => now(),
        ]);

        (new CalculateTicketResolutionTime($ticket->getKey()))->handle();

        $this->assertTrue($ticket->fresh()->sla_met);
    }

    #[Test]
    public function it_marks_the_target_as_missed_when_the_ticket_is_resolved_too_late(): void
    {
        $ticket = Ticket::factory()->create([
            'priority' => TicketPriority::Critical,
            'status' => TicketStatus::Resolved,
            'created_at' => now()->subHours(6),
            'resolved_at' => now(),
        ]);

        (new CalculateTicketResolutionTime($ticket->getKey()))->handle();

        $this->assertFalse($ticket->fresh()->sla_met);
    }

    #[Test]
    public function it_ignores_a_ticket_that_is_not_resolved(): void
    {
        $ticket = Ticket::factory()->create(['status' => TicketStatus::Open]);

        (new CalculateTicketResolutionTime($ticket->getKey()))->handle();

        $this->assertNull($ticket->fresh()->sla_met);
    }

    #[Test]
    public function it_queues_the_calculation_when_a_ticket_is_resolved(): void
    {
        Queue::fake();

        $ticket = Ticket::factory()->create(['status' => TicketStatus::InProgress]);

        app(ResolveTicket::class)->execute($ticket);

        Queue::assertPushed(CalculateTicketResolutionTime::class);
    }
}
