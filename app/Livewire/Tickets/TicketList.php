<?php

namespace App\Livewire\Tickets;

use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Builder;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use Livewire\Component;
use Livewire\WithPagination;

final class TicketList extends Component
{
    use WithPagination;

    public const PER_PAGE = 25;

    public const SORTABLE_COLUMNS = ['title', 'status', 'priority', 'created_at'];

    public const ASCENDING = 'asc';

    public const DESCENDING = 'desc';

    public string $status = '';

    public string $priority = '';

    public string $sortColumn = 'created_at';

    public string $sortDirection = self::DESCENDING;

    public function updatedStatus(): void
    {
        $this->resetPage();
    }

    public function updatedPriority(): void
    {
        $this->resetPage();
    }

    public function sortBy(string $column): void
    {
        if (! in_array($column, self::SORTABLE_COLUMNS, true)) {
            return;
        }

        if ($column === $this->sortColumn) {
            $this->sortDirection = $this->sortDirection === self::ASCENDING
                ? self::DESCENDING
                : self::ASCENDING;
        } else {
            $this->sortColumn = $column;
            $this->sortDirection = self::ASCENDING;
        }

        $this->resetPage();
    }

    public function render(): View
    {
        return view('livewire.tickets.ticket-list', [
            'tickets' => $this->tickets()->paginate(self::PER_PAGE),
            'statuses' => TicketStatus::cases(),
            'priorities' => TicketPriority::cases(),
            'sortableColumns' => self::SORTABLE_COLUMNS,
        ]);
    }

    /**
     * @return Builder<Ticket>
     */
    private function tickets(): Builder
    {
        return Ticket::query()
            ->controlled()
            ->with(['requester', 'assignedTechnician'])
            ->withCount('comments')
            ->when(
                $this->status !== '',
                fn (Builder $query): Builder => $query->where('status', $this->status),
            )
            ->when(
                $this->priority !== '',
                fn (Builder $query): Builder => $query->where('priority', $this->priority),
            )
            ->orderBy($this->sortColumn, $this->sortDirection);
    }
}
