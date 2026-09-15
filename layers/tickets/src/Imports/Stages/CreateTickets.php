<?php

namespace Layers\Tickets\Imports\Stages;

use Closure;
use Illuminate\Support\Facades\DB;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Imports\TicketImportPayload;
use Layers\Tickets\Models\Ticket;

final class CreateTickets
{
    public function handle(TicketImportPayload $payload, Closure $next): TicketImportPayload
    {
        if ($payload->rows === []) {
            return $next($payload);
        }

        $now = now();

        $rows = array_map(static fn (array $row): array => [
            'requester_id' => $payload->requesterIdsByEmail[$row['requester_email']],
            'title' => $row['title'],
            'description' => $row['description'],
            'priority' => $row['priority'],
            'status' => TicketStatus::Open->value,
            'created_at' => $now,
            'updated_at' => $now,
        ], $payload->rows);

        DB::transaction(static function () use ($rows): void {
            foreach (array_chunk($rows, 500) as $chunk) {
                Ticket::query()->insert($chunk);
            }
        });

        $payload->created = count($rows);

        return $next($payload);
    }
}
