<?php

namespace Layers\Tickets\Notifications\Channels;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

final class UrgencyChannel
{
    public function send(Model $notifiable, SendsUrgencyPayload $notification): void
    {
        Log::warning(__('tickets.notifications.channels.urgency'), $notification->toUrgency($notifiable));
    }
}
