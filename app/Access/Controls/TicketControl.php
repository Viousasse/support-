<?php

namespace App\Access\Controls;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Models\Ticket;
use Lomkit\Access\Controls\Control;
use Lomkit\Access\Perimeters\Perimeter;

final class TicketControl extends Control
{
    protected string $model = Ticket::class;

    /**
     * @return array<int, Perimeter>
     */
    protected function perimeters(): array
    {
        return [
            Perimeter::new()
                ->allowed(fn (User $user, string $method): bool => TicketPermission::ViewAny->allows($user, $method)),

            Perimeter::new()
                ->allowed(fn (User $user, string $method): bool => TicketPermission::ViewAssigned->allows($user, $method))
                ->should(fn (User $user, Ticket $ticket): bool => $ticket->assigned_technician_id === $user->getKey())
                ->query(fn (Builder $query, User $user): Builder => $query->where('assigned_technician_id', $user->getKey())),

            Perimeter::new()
                ->allowed(fn (User $user, string $method): bool => TicketPermission::ViewOwn->allows($user, $method))
                ->should(fn (User $user, Ticket $ticket): bool => $ticket->requester_id === $user->getKey())
                ->query(fn (Builder $query, User $user): Builder => $query->where('requester_id', $user->getKey())),
        ];
    }
}
