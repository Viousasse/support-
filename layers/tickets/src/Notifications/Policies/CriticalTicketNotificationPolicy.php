<?php

namespace Layers\Tickets\Notifications\Policies;

use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Notifications\Channels\ManagerAlertChannel;
use Layers\Tickets\Notifications\Channels\UrgencyChannel;

final class CriticalTicketNotificationPolicy implements TicketNotificationPolicy
{
    /**
     * @return array<int, TicketPriority>
     */
    public function handles(): array
    {
        return [TicketPriority::Critical];
    }

    /**
     * @return array<int, string>
     */
    public function channels(): array
    {
        return ['mail', UrgencyChannel::class, ManagerAlertChannel::class];
    }
}
