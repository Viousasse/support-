<?php

namespace Layers\Tickets\Imports\Stages;

use App\Models\User;
use Closure;
use Layers\Tickets\Imports\TicketImportPayload;

final class ResolveRequesters
{
    public function handle(TicketImportPayload $payload, Closure $next): TicketImportPayload
    {
        $emails = array_unique(array_column($payload->rows, 'requester_email'));

        $payload->requesterIdsByEmail = User::query()
            ->whereIn('email', $emails)
            ->pluck('id', 'email')
            ->all();

        $accepted = [];

        foreach ($payload->rows as $row) {
            array_key_exists($row['requester_email'], $payload->requesterIdsByEmail)
                ? $accepted[] = $row
                : $payload->reject($row['line'], __('tickets.import.unknown_requester', [
                    'email' => $row['requester_email'],
                ]));
        }

        $payload->rows = $accepted;

        return $next($payload);
    }
}
