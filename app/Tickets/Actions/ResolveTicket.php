<?php

namespace App\Tickets\Actions;

use App\Exceptions\InvalidTicketStatusTransitionException;
use App\Jobs\CalculateTicketResolutionTime;
use Layers\Tickets\Enums\TicketStatus;
use Illuminate\Support\Facades\DB;
use Layers\Tickets\Models\Ticket;

class ResolveTicket
{
    public function execute(Ticket $ticket): Ticket
    {
        if (! $ticket->status->canTransitionTo(TicketStatus::Resolved)) {
            throw new InvalidTicketStatusTransitionException();
        }

        $ticket->status = TicketStatus::Resolved;
        $ticket->resolved_at = now();
        $ticket->save();

        DB::afterCommit(function () use ($ticket) {
            CalculateTicketResolutionTime::dispatch($ticket->id);
        });

        return $ticket;
    }
}