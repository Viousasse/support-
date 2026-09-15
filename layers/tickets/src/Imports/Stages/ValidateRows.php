<?php

namespace Layers\Tickets\Imports\Stages;

use Closure;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Imports\TicketImportPayload;

final class ValidateRows
{
    public function handle(TicketImportPayload $payload, Closure $next): TicketImportPayload
    {
        $accepted = [];

        foreach ($payload->rows as $row) {
            $validator = Validator::make($row, [
                'title' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string'],
                'priority' => ['required', Rule::enum(TicketPriority::class)],
                'requester_email' => ['required', 'email'],
            ]);

            $validator->fails()
                ? $payload->reject($row['line'], (string) $validator->errors()->first())
                : $accepted[] = $row;
        }

        $payload->rows = $accepted;

        return $next($payload);
    }
}
