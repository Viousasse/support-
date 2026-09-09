<?php

namespace App\Tickets\Actions;

use App\Exceptions\InvalidTicketStatusTransitionException;
use App\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

class StartWorkOnTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (!$ticket->status->canTransitionTo(TicketStatus::InProgress)) {
            throw new InvalidTicketStatusTransitionException();
        }

        $ticket->status = TicketStatus::InProgress;
        $ticket->save();

        return $ticket;
    }
}