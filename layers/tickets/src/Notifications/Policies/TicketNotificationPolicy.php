<?php

namespace Layers\Tickets\Notifications\Policies;

use Layers\Tickets\Enums\TicketPriority;

interface TicketNotificationPolicy
{
    /**
     * The priorities this policy answers for. An unclaimed priority falls back
     * to the standard policy, so a new priority needs no new class.
     *
     * @return array<int, TicketPriority>
     */
    public function handles(): array;

    /**
     * @return array<int, string>
     */
    public function channels(): array;
}
