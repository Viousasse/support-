<?php

namespace App\Tickets\Actions;

use App\Exceptions\InvalidTicketStatusTransitionException;
use App\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

class UnassignTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (!$ticket->status->canTransitionTo(TicketStatus::Open)) {
            throw new InvalidTicketStatusTransitionException();
        }

        $ticket->status = TicketStatus::Open;
        $ticket->assignedTechnician()->dissociate();
        $ticket->save();

        return $ticket;
    }
}