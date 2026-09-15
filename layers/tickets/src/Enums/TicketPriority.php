<?php

namespace Layers\Tickets\Enums;

enum TicketPriority: string
{
    case Low = 'low';
    case Normal = 'normal';
    case High = 'high';
    case Critical = 'critical';

    public function targetResolutionHours(): int
    {
        return match ($this) {
            self::Low => 72,
            self::Normal => 24,
            self::High => 8,
            self::Critical => 2,
        };
    }

    public function next(): ?self
    {
        return match ($this) {
            self::Low => self::Normal,
            self::Normal => self::High,
            self::High => self::Critical,
            self::Critical => null,
        };
    }

    /**
     * The semantic tone the interface paints this priority with. The enum names
     * the meaning, the view owns the styling.
     */
    public function tone(): string
    {
        return match ($this) {
            self::Low => 'muted',
            self::Normal => 'info',
            self::High => 'progress',
            self::Critical => 'danger',
        };
    }

    public function translationKey(): string
    {
        return "tickets.priority.{$this->value}";
    }
}
