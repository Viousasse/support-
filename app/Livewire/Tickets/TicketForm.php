<?php

namespace App\Livewire\Tickets;

use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Layers\Tickets\Actions\AssignTicket;
use Layers\Tickets\Actions\AttachFileToTicket;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Models\Ticket;
use Livewire\Component;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use Livewire\WithFileUploads;

final class TicketForm extends Component
{
    use WithFileUploads;

    public ?Ticket $ticket = null;

    public string $title = '';

    public string $description = '';

    public string $priority = '';

    public ?int $technicianId = null;

    public ?TemporaryUploadedFile $attachment = null;

    public function mount(?Ticket $ticket = null): void
    {
        $this->ticket = $ticket !== null && $ticket->exists ? $ticket : null;

        if ($this->ticket === null) {
            $this->priority = TicketPriority::Normal->value;

            return;
        }

        $this->title = $this->ticket->title;
        $this->description = $this->ticket->description;
        $this->priority = $this->ticket->priority->value;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'priority' => ['required', Rule::enum(TicketPriority::class)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => __('tickets.validation.title_required'),
            'title.max' => __('tickets.validation.title_max'),
            'description.required' => __('tickets.validation.description_required'),
            'priority.required' => __('tickets.validation.priority_required'),
            'priority.enum' => __('tickets.validation.priority_enum'),
        ];
    }

    public function save(): void
    {
        $attributes = $this->validate();

        if ($this->ticket === null) {
            Gate::authorize('create', Ticket::class);

            $this->ticket = Ticket::create($attributes + [
                'requester_id' => auth()->id(),
            ]);

            session()->flash('status', __('tickets.messages.created'));

            return;
        }

        Gate::authorize('update', $this->ticket);

        $this->ticket->update($attributes);

        session()->flash('status', __('tickets.messages.updated'));
    }

    public function assign(AssignTicket $action): void
    {
        Gate::authorize(TicketPermission::Assign->value);

        $technician = User::findOrFail($this->technicianId);

        try {
            $action->execute($this->ticket, $technician);
        } catch (InvalidTicketStatusTransitionException $exception) {
            $this->addError('ticket', $exception->getMessage());

            return;
        }

        session()->flash('status', __('tickets.messages.assigned'));
    }

    public function attach(AttachFileToTicket $action): void
    {
        Gate::authorize('update', $this->ticket);

        $this->validate([
            'attachment' => ['required', 'file', 'max:5120'],
        ], [
            'attachment.required' => __('tickets.validation.attachment_required'),
            'attachment.file' => __('tickets.validation.attachment_file'),
            'attachment.max' => __('tickets.validation.attachment_max'),
        ]);

        $action->execute($this->ticket, $this->attachment, auth()->user());

        $this->reset('attachment');

        session()->flash('status', __('tickets.messages.attached'));
    }

    public function render(): View
    {
        return view('livewire.tickets.ticket-form', [
            'priorities' => TicketPriority::cases(),
            'technicians' => $this->technicians(),
            'attachments' => $this->ticket?->attachments()->latest()->get() ?? new Collection,
            'canAssign' => Gate::allows(TicketPermission::Assign->value),
        ]);
    }

    /**
     * @return Collection<int, User>
     */
    private function technicians(): Collection
    {
        if ($this->ticket === null || Gate::denies(TicketPermission::Assign->value)) {
            return new Collection;
        }

        return User::permission(TicketPermission::ViewAssigned->value)
            ->orderBy('name')
            ->get();
    }
}
