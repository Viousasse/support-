<?php

namespace App\Policies;

use App\Access\Controls\Ticket as TicketControl;
use Layers\Tickets\Models\Ticket;
use Lomkit\Access\Policies\ControlledPolicy;


class TicketPolicy extends ControlledPolicy
{
    protected string $model = Ticket::class;
    protected string $control = TicketControl::class;
}