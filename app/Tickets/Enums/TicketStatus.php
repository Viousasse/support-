<?php

namespace App\Tickets\Enums;

enum TicketStatus: string
{
    case Open = 'open';
    case Assigned = 'assigned';
    case InProgress = 'in_progress';
    case Resolved = 'resolved';
    case Closed = 'closed';

    public function canTransitionTo(self $to): bool
    {
        return match ($this) {
            self::Open => $to === self::Assigned,
            self::Assigned => $to === self::InProgress || $to === self::Open,
            self::InProgress => $to === self::Resolved || $to === self::Assigned,
            self::Resolved => $to === self::Closed || $to === self::InProgress,
            self::Closed => false,
        };
    }
}