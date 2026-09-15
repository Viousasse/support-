<?php

namespace Layers\Tickets\Actions;

use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Models\Ticket;

final class UnassignTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::Open)) {
            throw new InvalidTicketStatusTransitionException($ticket->status, TicketStatus::Open);
        }

        $ticket->status = TicketStatus::Open;
        $ticket->assignedTechnician()->dissociate();
        $ticket->save();

        return $ticket;
    }
}
