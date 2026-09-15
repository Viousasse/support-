<?php

namespace Layers\Tickets\Listeners;

use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Notifications\TicketAssignedNotification;

final class SendTicketAssignedNotification
{
    public function handle(TicketAssigned $event): void
    {
        $event->technician->notify(
            new TicketAssignedNotification($event->ticket),
        );
    }
}
