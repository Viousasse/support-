<?php

namespace Layers\Tickets\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TicketExportController extends Controller
{
    public function __invoke(Request $request): StreamedResponse
    {
        $callback = function () {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, ['id', 'title', 'priority', 'resolved_at']);

            DB::table('tickets')
                ->select('id', 'title', 'priority', 'resolved_at')
                ->where('status', 'resolved')
                ->whereBetween('resolved_at', [now()->startOfMonth(), now()->endOfMonth()])
                ->orderBy('resolved_at')
                ->cursor()
                ->each(function ($ticket) use ($handle) {
                    fputcsv($handle, [
                        $ticket->id,
                        $ticket->title,
                        $ticket->priority,
                        $ticket->resolved_at,
                    ]);
                });

            fclose($handle);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="tickets-resolus.csv"',
        ]);
    }
}