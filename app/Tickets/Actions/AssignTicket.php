<?php

namespace App\Tickets\Actions;

use App\Exceptions\InvalidTicketStatusTransitionException;
use App\Models\User;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Models\Ticket;

class AssignTicket
{
    public function execute(Ticket $ticket, User $technician): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::Assigned)) {
            throw new InvalidTicketStatusTransitionException();
        }

        $ticket->status = TicketStatus::Assigned;
        $ticket->assignedTechnician()->associate($technician);
        $ticket->save();

        TicketAssigned::dispatch($ticket, $technician);

        return $ticket;
    }
}