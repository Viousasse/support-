<?php

namespace Layers\Tickets\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Routing\Controller;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use SplFileObject;
use Symfony\Component\HttpFoundation\StreamedResponse;

final class TicketExportController extends Controller
{
    public function __invoke(): StreamedResponse
    {
        $query = Ticket::query()
            ->controlled()
            ->select('id', 'title', 'priority', 'resolved_at')
            ->where('status', TicketStatus::Resolved)
            ->whereBetween('resolved_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->orderBy('resolved_at');

        return response()->streamDownload(
            fn () => $this->writeCsv($query),
            'resolved-tickets.csv',
            ['Content-Type' => 'text/csv'],
        );
    }

    /**
     * @param  Builder<Ticket>  $query
     */
    private function writeCsv(Builder $query): void
    {
        $output = new SplFileObject('php://output', 'w');

        $output->fputcsv(['id', 'title', 'priority', 'resolved_at']);

        foreach ($query->cursor() as $ticket) {
            $output->fputcsv([
                $ticket->id,
                $ticket->title,
                $ticket->priority->value,
                $ticket->resolved_at->toDateTimeString(),
            ]);
        }
    }
}
