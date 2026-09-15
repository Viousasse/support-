<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Layers\Tickets\Broadcasting\TicketAudience;

Broadcast::channel(
    TicketAudience::CHANNEL.'.{userId}',
    fn (User $user, string $userId): bool => (int) $user->getKey() === (int) $userId,
);
