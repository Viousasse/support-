<?php

namespace App\Tickets\Listeners;

use App\Tickets\Events\TicketAssigned;
use App\Tickets\Notifications\TicketAssignedNotification;

class SendTicketAssignedNotification
{
    public function handle(TicketAssigned $event): void
    {
        $event->technician->notify(new TicketAssignedNotification($event->ticket));
    }
}