<?php

namespace Layers\Tickets\Notifications\Channels;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

final class ManagerAlertChannel
{
    public function send(Model $notifiable, SendsUrgencyPayload $notification): void
    {
        Log::critical(__('tickets.notifications.channels.alert'), $notification->toUrgency($notifiable));
    }
}
