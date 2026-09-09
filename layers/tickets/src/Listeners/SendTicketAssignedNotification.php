<?php

namespace Layers\Tickets\Listeners;

use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Notifications\TicketAssignedNotification;

class SendTicketAssignedNotification
{
    public function handle(TicketAssigned $event): void
    {
        $event->technician->notify(
            new TicketAssignedNotification($event->ticket),
        );
    }
}