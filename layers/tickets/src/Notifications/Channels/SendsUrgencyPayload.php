<?php

namespace Layers\Tickets\Notifications\Channels;

use Illuminate\Database\Eloquent\Model;

interface SendsUrgencyPayload
{
    /**
     * @return array<string, int|string>
     */
    public function toUrgency(Model $notifiable): array;
}
