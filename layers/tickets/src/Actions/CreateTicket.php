<?php

namespace Layers\Tickets\Actions;

use App\Models\User;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

final class CreateTicket
{
    /**
     * @param  array{title: string, description: string, priority: string}  $attributes
     */
    public function execute(array $attributes, User $requester): Ticket
    {
        return Ticket::create($attributes + [
            'requester_id' => $requester->getKey(),
            'status' => TicketStatus::Open,
        ]);
    }
}
