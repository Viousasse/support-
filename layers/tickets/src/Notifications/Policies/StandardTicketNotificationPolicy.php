<?php

namespace Layers\Tickets\Notifications\Policies;

use Layers\Tickets\Enums\TicketPriority;

final class StandardTicketNotificationPolicy implements TicketNotificationPolicy
{
    /**
     * @return array<int, TicketPriority>
     */
    public function handles(): array
    {
        return [TicketPriority::Low, TicketPriority::Normal];
    }

    /**
     * @return array<int, string>
     */
    public function channels(): array
    {
        return ['mail'];
    }
}
