<?php

namespace Tests\Feature\Extensions;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Notifications\TicketEscalatedNotification;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class EscalateOverdueTicketsTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_escalates_a_ticket_that_went_past_its_target(): void
    {
        Notification::fake();

        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = $this->overdueTicket(TicketPriority::Normal);

        $this->artisan('tickets:escalate-overdue')->assertSuccessful();

        $this->assertSame(TicketPriority::High, $ticket->fresh()->priority);
        $this->assertNotNull($ticket->fresh()->escalated_at);
        Notification::assertSentTo($manager, TicketEscalatedNotification::class);
    }

    #[Test]
    public function it_leaves_a_ticket_that_is_still_within_its_target(): void
    {
        Notification::fake();

        $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = Ticket::factory()->create([
            'priority' => TicketPriority::Low,
            'created_at' => now()->subHours(1),
        ]);

        $this->artisan('tickets:escalate-overdue')->assertSuccessful();

        $this->assertSame(TicketPriority::Low, $ticket->fresh()->priority);
        $this->assertNull($ticket->fresh()->escalated_at);
        Notification::assertNothingSent();
    }

    #[Test]
    public function it_does_not_escalate_twice_for_the_same_overrun(): void
    {
        Notification::fake();

        $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = $this->overdueTicket(TicketPriority::Low);

        $this->artisan('tickets:escalate-overdue')->assertSuccessful();
        $this->artisan('tickets:escalate-overdue')->assertSuccessful();

        $this->assertSame(TicketPriority::Normal, $ticket->fresh()->priority);
        Notification::assertSentTimes(TicketEscalatedNotification::class, 1);
    }

    #[Test]
    public function it_flags_a_critical_ticket_without_raising_it(): void
    {
        Notification::fake();

        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = $this->overdueTicket(TicketPriority::Critical);

        $this->artisan('tickets:escalate-overdue')->assertSuccessful();

        $this->assertSame(TicketPriority::Critical, $ticket->fresh()->priority);
        Notification::assertSentTo($manager, TicketEscalatedNotification::class);
    }

    #[Test]
    public function it_ignores_resolved_and_closed_tickets(): void
    {
        Notification::fake();

        $this->userWithPermissions(TicketPermission::ViewAny);

        foreach (TicketStatus::terminal() as $status) {
            Ticket::factory()->withStatus($status)->create([
                'priority' => TicketPriority::Low,
                'created_at' => now()->subYear(),
            ]);
        }

        $this->artisan('tickets:escalate-overdue')->assertSuccessful();

        Notification::assertNothingSent();
    }

    #[Test]
    public function it_keeps_the_query_count_independent_from_the_number_of_tickets(): void
    {
        Notification::fake();
        $this->userWithPermissions(TicketPermission::ViewAny);

        $this->countQueriesWhileEscalating(1);

        $queriesForOne = $this->countQueriesWhileEscalating(1);
        $queriesForTwenty = $this->countQueriesWhileEscalating(20);

        $this->assertSame($queriesForOne, $queriesForTwenty);
    }

    private function overdueTicket(TicketPriority $priority): Ticket
    {
        return Ticket::factory()->create([
            'priority' => $priority,
            'created_at' => now()->subHours($priority->targetResolutionHours() + 1),
        ]);
    }

    private function countQueriesWhileEscalating(int $tickets): int
    {
        Ticket::query()->forceDelete();

        Ticket::factory()->count($tickets)->create([
            'priority' => TicketPriority::Low,
            'created_at' => now()->subDays(30),
        ]);

        DB::connection()->enableQueryLog();
        DB::connection()->flushQueryLog();

        $this->artisan('tickets:escalate-overdue')->assertSuccessful();

        return count(DB::connection()->getQueryLog());
    }
}
