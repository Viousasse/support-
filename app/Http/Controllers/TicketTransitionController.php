<?php

namespace App\Http\Controllers;

use App\Tickets\Actions\ResolveTicket;
use App\Tickets\Actions\AssignTicket;
use Layers\Tickets\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class TicketTransitionController extends Controller
{
    public function assign(Request $request, Ticket $ticket, User $technician)
    {
        $action = new AssignTicket();
        $updatedTicket = $action->execute($ticket, $technician);

        return response()->json($updatedTicket);
    }
    public function resolve(Ticket $ticket)
    {
        $action = new ResolveTicket();

        $ticket = $action->execute($ticket);

        return response()->json([
            'message' => 'Ticket resolved successfully',
            'ticket' => $ticket,
        ]);
    }
}