<?php

namespace Layers\Tickets\Actions;

use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Jobs\CalculateTicketResolutionTime;
use Layers\Tickets\Models\Ticket;

final class ResolveTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::Resolved)) {
            throw new InvalidTicketStatusTransitionException($ticket->status, TicketStatus::Resolved);
        }

        $ticket->status = TicketStatus::Resolved;
        $ticket->resolved_at = now();
        $ticket->save();

        CalculateTicketResolutionTime::dispatch($ticket->getKey())->afterCommit();

        return $ticket;
    }
}
