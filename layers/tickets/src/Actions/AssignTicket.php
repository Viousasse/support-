<?php

namespace Layers\Tickets\Actions;

use App\Models\User;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Models\Ticket;

final class AssignTicket
{
    public function execute(Ticket $ticket, User $technician): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::Assigned)) {
            throw new InvalidTicketStatusTransitionException($ticket->status, TicketStatus::Assigned);
        }

        $ticket->status = TicketStatus::Assigned;
        $ticket->assignedTechnician()->associate($technician);
        $ticket->save();

        TicketAssigned::dispatch($ticket, $technician);

        return $ticket;
    }
}
