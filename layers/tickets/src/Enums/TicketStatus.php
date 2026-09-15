<?php

namespace Layers\Tickets\Enums;

enum TicketStatus: string
{
    case Open = 'open';
    case Assigned = 'assigned';
    case InProgress = 'in_progress';
    case Resolved = 'resolved';
    case Closed = 'closed';

    public function canTransitionTo(self $status): bool
    {
        return in_array($status, $this->allowedTransitions(), true);
    }

    public function isTerminal(): bool
    {
        return $this->allowedTransitions() === [];
    }

    /**
     * @return array<int, self>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::Open => [self::Assigned],
            self::Assigned => [self::InProgress, self::Open],
            self::InProgress => [self::Resolved, self::Assigned],
            self::Resolved => [self::Closed, self::InProgress],
            self::Closed => [],
        };
    }

    /**
     * @return array<int, self>
     */
    public static function terminal(): array
    {
        return array_values(array_filter(self::cases(), fn (self $status): bool => $status->isTerminal()));
    }

    /**
     * The semantic tone the interface paints this status with. The enum names
     * the meaning, the view owns the styling.
     */
    public function tone(): string
    {
        return match ($this) {
            self::Open => 'neutral',
            self::Assigned, self::InProgress => 'info',
            self::Resolved => 'success',
            self::Closed => 'muted',
        };
    }

    public function translationKey(): string
    {
        return "tickets.status.{$this->value}";
    }
}
