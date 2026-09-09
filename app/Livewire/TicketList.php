<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;
use Layers\Tickets\Models\Ticket;

class TicketList extends Component
{
    use WithPagination;

    public function render()
    {
        $tickets = Ticket::query()
            ->with(['requester', 'assignedTechnician'])
            ->withCount('comments')
            ->paginate(25);

        return view('livewire.ticket-list', [
            'tickets' => $tickets,
        ]);
    }
}