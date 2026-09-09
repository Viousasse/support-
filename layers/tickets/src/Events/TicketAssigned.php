<?php

namespace Layers\Tickets\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Layers\Tickets\Models\Ticket;

class TicketAssigned
{
    use Dispatchable;
    use SerializesModels;

    public function __construct(
        public Ticket $ticket,
        public User $technician,
    ) {
    }
}