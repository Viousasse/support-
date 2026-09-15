<?php

namespace App\Livewire\Tickets;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Gate;
use Layers\Tickets\Actions\StartTicketImport;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Models\TicketImport;
use Livewire\Component;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\WithFileUploads;

final class TicketImportForm extends Component
{
    use WithFileUploads;

    public ?TemporaryUploadedFile $csv = null;

    public ?int $importId = null;

    public function import(StartTicketImport $action): void
    {
        Gate::authorize('create', Ticket::class);

        $this->validate([
            'csv' => ['required', 'file', 'mimes:csv,txt', 'max:10240'],
        ], [
            'csv.required' => __('tickets.import.file_required'),
            'csv.mimes' => __('tickets.import.file_mimes'),
        ]);

        $this->importId = $action->execute($this->csv, auth()->user())->getKey();

        $this->reset('csv');

        session()->flash('status', __('tickets.import.queued'));
    }

    public function render(): View
    {
        return view('livewire.tickets.ticket-import-form', [
            'import' => $this->importId === null ? null : TicketImport::query()->find($this->importId),
        ]);
    }
}
