<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
}