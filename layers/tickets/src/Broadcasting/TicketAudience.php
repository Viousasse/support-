<?php

namespace Layers\Tickets\Broadcasting;

use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Models\Ticket;

final class TicketAudience
{
    public const CHANNEL = 'tickets';

    /**
     * The users allowed to see a ticket: the one who opened it, the technician
     * it is assigned to, and everyone holding the permission to view them all.
     *
     * @return array<int, PrivateChannel>
     */
    public function channelsFor(Ticket $ticket): array
    {
        $identifiers = array_filter([
            $ticket->requester_id,
            $ticket->assigned_technician_id,
        ]);

        $identifiers = array_unique(array_merge(
            $identifiers,
            User::permission(TicketPermission::ViewAny->value)->pluck('id')->all(),
        ));

        return array_map(
            static fn (int $identifier): PrivateChannel => new PrivateChannel(self::channelFor($identifier)),
            array_values($identifiers),
        );
    }

    public static function channelFor(int $userId): string
    {
        return self::CHANNEL.'.'.$userId;
    }
}
