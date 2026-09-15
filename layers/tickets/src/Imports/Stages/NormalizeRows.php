<?php

namespace Layers\Tickets\Imports\Stages;

use Closure;
use Layers\Tickets\Imports\TicketImportPayload;

final class NormalizeRows
{
    public function handle(TicketImportPayload $payload, Closure $next): TicketImportPayload
    {
        $payload->rows = array_map(static fn (array $row): array => [
            'line' => $row['line'],
            'title' => trim($row['title']),
            'description' => trim($row['description']),
            'priority' => mb_strtolower(trim($row['priority'])),
            'requester_email' => mb_strtolower(trim($row['requester_email'])),
        ], $payload->rows);

        return $next($payload);
    }
}
