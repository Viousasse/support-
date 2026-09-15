<?php

namespace Layers\Tickets\Enums;

use App\Models\User;

enum TicketPermission: string
{
    case ViewOwn = 'tickets.view.own';
    case ViewAssigned = 'tickets.view.assigned';
    case ViewAny = 'tickets.view.any';
    case Create = 'tickets.create';
    case Assign = 'tickets.assign';
    case Close = 'tickets.close';

    public function allows(User $user, string $method): bool
    {
        return $method === 'create'
            ? $user->can(self::Create->value)
            : $user->can($this->value);
    }
}
