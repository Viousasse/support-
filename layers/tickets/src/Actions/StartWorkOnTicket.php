<?php

namespace Layers\Tickets\Actions;

use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Models\Ticket;

final class StartWorkOnTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::InProgress)) {
            throw new InvalidTicketStatusTransitionException($ticket->status, TicketStatus::InProgress);
        }

        $ticket->status = TicketStatus::InProgress;
        $ticket->save();

        return $ticket;
    }
}
