<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Layers\Tickets\Models\Ticket;

class CalculateTicketResolutionTime implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public int $ticketId,
    ) {}

    public function handle(): void
    {
        $ticket = Ticket::find($this->ticketId);

        if (! $ticket || $ticket->status !== 'resolved' || ! $ticket->resolved_at) {
            return;
        }

        // Cibles de délai selon la priorité (en secondes)
        $targets = [
            'low' => 7 * 24 * 60 * 60,      // 7 jours
            'normal' => 3 * 24 * 60 * 60,   // 3 jours
            'high' => 1 * 24 * 60 * 60,     // 1 jour
        ];

        $priority = $ticket->priority->value ?? 'normal';
        $target = $targets[$priority] ?? $targets['normal'];

        // Calcul en base : différence en secondes entre resolved_at et created_at
        // et mise à jour de sla_met (1 = respecté, 0 = non respecté)
        Ticket::where('id', $ticket->id)
            ->update([
                'sla_met' => DB::raw(
                    "(UNIX_TIMESTAMP(resolved_at) - UNIX_TIMESTAMP(created_at)) <= {$target}"
                ),
            ]);
    }
}