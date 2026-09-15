<?php

namespace Tests\Unit\Tickets;

use Layers\Tickets\Enums\TicketStatus;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class TicketStatusTest extends TestCase
{
    /**
     * @return array<string, array{TicketStatus, TicketStatus}>
     */
    public static function legalTransitions(): array
    {
        return [
            'open to assigned' => [TicketStatus::Open, TicketStatus::Assigned],
            'assigned to in progress' => [TicketStatus::Assigned, TicketStatus::InProgress],
            'assigned back to open' => [TicketStatus::Assigned, TicketStatus::Open],
            'in progress to resolved' => [TicketStatus::InProgress, TicketStatus::Resolved],
            'in progress back to assigned' => [TicketStatus::InProgress, TicketStatus::Assigned],
            'resolved to closed' => [TicketStatus::Resolved, TicketStatus::Closed],
            'resolved back to in progress' => [TicketStatus::Resolved, TicketStatus::InProgress],
        ];
    }

    /**
     * @return array<string, array{TicketStatus, TicketStatus}>
     */
    public static function illegalTransitions(): array
    {
        return [
            'open to in progress' => [TicketStatus::Open, TicketStatus::InProgress],
            'open to resolved' => [TicketStatus::Open, TicketStatus::Resolved],
            'open to closed' => [TicketStatus::Open, TicketStatus::Closed],
            'assigned to resolved' => [TicketStatus::Assigned, TicketStatus::Resolved],
            'assigned to closed' => [TicketStatus::Assigned, TicketStatus::Closed],
            'in progress to open' => [TicketStatus::InProgress, TicketStatus::Open],
            'in progress to closed' => [TicketStatus::InProgress, TicketStatus::Closed],
            'resolved to open' => [TicketStatus::Resolved, TicketStatus::Open],
            'resolved to assigned' => [TicketStatus::Resolved, TicketStatus::Assigned],
            'closed to open' => [TicketStatus::Closed, TicketStatus::Open],
            'closed to assigned' => [TicketStatus::Closed, TicketStatus::Assigned],
            'closed to in progress' => [TicketStatus::Closed, TicketStatus::InProgress],
            'closed to resolved' => [TicketStatus::Closed, TicketStatus::Resolved],
        ];
    }

    #[Test]
    #[DataProvider('legalTransitions')]
    public function it_allows_the_transitions_of_the_specification(TicketStatus $from, TicketStatus $to): void
    {
        $this->assertTrue($from->canTransitionTo($to));
    }

    #[Test]
    #[DataProvider('illegalTransitions')]
    public function it_refuses_every_transition_outside_the_specification(TicketStatus $from, TicketStatus $to): void
    {
        $this->assertFalse($from->canTransitionTo($to));
    }

    #[Test]
    public function it_marks_only_the_closed_status_as_terminal(): void
    {
        foreach (TicketStatus::cases() as $status) {
            $this->assertSame($status === TicketStatus::Closed, $status->isTerminal());
        }
    }
}
