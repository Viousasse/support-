<?php

namespace Layers\Tickets\Actions;

use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Models\Ticket;

final class CloseTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::Closed)) {
            throw new InvalidTicketStatusTransitionException($ticket->status, TicketStatus::Closed);
        }

        $ticket->status = TicketStatus::Closed;
        $ticket->save();

        return $ticket;
    }
}
