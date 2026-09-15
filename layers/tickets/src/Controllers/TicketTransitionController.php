<?php

namespace Layers\Tickets\Controllers;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Layers\Tickets\Actions\AssignTicket;
use Layers\Tickets\Actions\CloseTicket;
use Layers\Tickets\Actions\ResolveTicket;
use Layers\Tickets\Actions\StartWorkOnTicket;
use Layers\Tickets\Actions\UnassignTicket;
use Layers\Tickets\Models\Ticket;

final class TicketTransitionController extends Controller
{
    public function assign(AssignTicket $action, Ticket $ticket, User $technician): Response
    {
        $action->execute($ticket, $technician);

        return response()->noContent();
    }

    public function unassign(UnassignTicket $action, Ticket $ticket): Response
    {
        $action->execute($ticket);

        return response()->noContent();
    }

    public function startWork(StartWorkOnTicket $action, Ticket $ticket): Response
    {
        $action->execute($ticket);

        return response()->noContent();
    }

    public function resolve(ResolveTicket $action, Ticket $ticket): Response
    {
        $action->execute($ticket);

        return response()->noContent();
    }

    public function close(CloseTicket $action, Ticket $ticket): Response
    {
        $action->execute($ticket);

        return response()->noContent();
    }
}
