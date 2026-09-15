<?php

namespace Layers\Tickets\Actions;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Notification;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Notifications\TicketEscalatedNotification;

final class EscalateOverdueTickets
{
    /**
     * @return array{examined: int, escalated: int, flagged: int}
     */
    public function execute(): array
    {
        $managers = User::permission(TicketPermission::ViewAny->value)->get();
        $escalated = 0;
        $flagged = 0;

        foreach (TicketPriority::cases() as $priority) {
            $overdue = $this->overdue($priority)->get();

            if ($overdue->isEmpty()) {
                continue;
            }

            $raised = $priority->next();
            $this->markAsEscalated($overdue, $raised);
            $this->notify($managers, $overdue, $raised ?? $priority);

            $raised === null
                ? $flagged += $overdue->count()
                : $escalated += $overdue->count();
        }

        return [
            'examined' => $this->open()->count(),
            'escalated' => $escalated,
            'flagged' => $flagged,
        ];
    }

    /**
     * @param  Collection<int, Ticket>  $overdue
     */
    private function markAsEscalated(Collection $overdue, ?TicketPriority $raised): void
    {
        $attributes = ['escalated_at' => now()];

        if ($raised !== null) {
            $attributes['priority'] = $raised;
        }

        Ticket::query()->whereKey($overdue->modelKeys())->update($attributes);
    }

    /**
     * @param  Collection<int, User>  $managers
     * @param  Collection<int, Ticket>  $overdue
     */
    private function notify(Collection $managers, Collection $overdue, TicketPriority $priority): void
    {
        foreach ($overdue as $ticket) {
            $ticket->priority = $priority;

            Notification::send($managers, new TicketEscalatedNotification($ticket));
        }
    }

    /**
     * @return Builder<Ticket>
     */
    private function open(): Builder
    {
        return Ticket::query()
            ->whereNull('resolved_at')
            ->whereNotIn('status', TicketStatus::terminal());
    }

    /**
     * @return Builder<Ticket>
     */
    private function overdue(TicketPriority $priority): Builder
    {
        $deadline = now()->subHours($priority->targetResolutionHours());

        return $this->open()
            ->where('priority', $priority)
            ->where(fn (Builder $query): Builder => $query
                ->where('escalated_at', '<=', $deadline)
                ->orWhere(fn (Builder $never): Builder => $never
                    ->whereNull('escalated_at')
                    ->where('created_at', '<=', $deadline)));
    }
}
