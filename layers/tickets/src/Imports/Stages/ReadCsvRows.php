<?php

namespace Layers\Tickets\Imports\Stages;

use Closure;
use Illuminate\Support\Facades\Storage;
use Layers\Tickets\Exceptions\TicketImportFileIsUnreadableException;
use Layers\Tickets\Imports\TicketImportPayload;

final class ReadCsvRows
{
    public const COLUMNS = ['title', 'description', 'priority', 'requester_email'];

    public function handle(TicketImportPayload $payload, Closure $next): TicketImportPayload
    {
        $disk = Storage::disk($payload->disk);

        if (! $disk->exists($payload->path)) {
            throw new TicketImportFileIsUnreadableException($payload->path);
        }

        $lines = preg_split('/\R/', trim((string) $disk->get($payload->path))) ?: [];
        array_shift($lines);

        foreach ($lines as $offset => $line) {
            if (trim($line) === '') {
                continue;
            }

            $columns = array_combine(
                self::COLUMNS,
                array_pad(array_slice(str_getcsv($line, escape: '\\'), 0, count(self::COLUMNS)), count(self::COLUMNS), ''),
            );

            $payload->rows[] = [
                'line' => $offset + 2,
                'title' => (string) $columns['title'],
                'description' => (string) $columns['description'],
                'priority' => (string) $columns['priority'],
                'requester_email' => (string) $columns['requester_email'],
            ];
        }

        return $next($payload);
    }
}
