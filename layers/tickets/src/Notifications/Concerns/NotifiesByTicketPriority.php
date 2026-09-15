<?php

namespace Layers\Tickets\Notifications\Concerns;

use Illuminate\Database\Eloquent\Model;
use Layers\Tickets\Notifications\Policies\TicketNotificationPolicies;

trait NotifiesByTicketPriority
{
    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return app(TicketNotificationPolicies::class)
            ->for($this->ticket->priority)
            ->channels();
    }

    /**
     * @return array<string, int|string>
     */
    public function toUrgency(Model $notifiable): array
    {
        return [
            'ticket_id' => $this->ticket->getKey(),
            'title' => $this->ticket->title,
            'priority' => $this->ticket->priority->value,
            'notifiable_id' => $notifiable->getKey(),
        ];
    }
}
