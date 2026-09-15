<?php

namespace Layers\Tickets\Events;

use App\Models\User;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Layers\Tickets\Broadcasting\TicketAudience;
use Layers\Tickets\Models\Ticket;

final class TicketAssigned implements ShouldBroadcast
{
    use Dispatchable;
    use SerializesModels;

    public function __construct(
        public readonly Ticket $ticket,
        public readonly User $technician,
    ) {}

    /**
     * @return array<int, PrivateChannel>
     */
    public function broadcastOn(): array
    {
        return app(TicketAudience::class)->channelsFor($this->ticket);
    }

    public function broadcastAs(): string
    {
        return 'TicketAssigned';
    }

    /**
     * @return array<string, int|string>
     */
    public function broadcastWith(): array
    {
        return ['ticket_id' => $this->ticket->getKey()];
    }
}
