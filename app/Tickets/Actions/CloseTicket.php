<?php

namespace App\Tickets\Actions;

use App\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

class CloseTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (!$ticket->status->canTransitionTo(TicketStatus::Closed)) {
            throw new InvalidTicketStatusTransitionException();
        }

        $ticket->status = TicketStatus::Closed;
        $ticket->save();

        return $ticket;
    }
}