<?php

namespace Layers\Tickets\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

final class CalculateTicketResolutionTime implements ShouldQueue
{
    use Queueable;

    public function __construct(private readonly int $ticketId) {}

    public function handle(): void
    {
        $ticket = Ticket::query()
            ->whereKey($this->ticketId)
            ->where('status', TicketStatus::Resolved)
            ->whereNotNull('resolved_at')
            ->first();

        if ($ticket === null) {
            return;
        }

        $target = $ticket->created_at->addHours($ticket->priority->targetResolutionHours());

        $ticket->sla_met = $ticket->resolved_at->lessThanOrEqualTo($target);
        $ticket->save();
    }
}
