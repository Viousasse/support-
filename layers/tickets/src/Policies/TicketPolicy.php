<?php

namespace Layers\Tickets\Policies;

use App\Access\Controls\TicketControl;
use Layers\Tickets\Models\Ticket;
use Lomkit\Access\Policies\ControlledPolicy;

final class TicketPolicy extends ControlledPolicy
{
    protected string $model = Ticket::class;

    protected string $control = TicketControl::class;
}
