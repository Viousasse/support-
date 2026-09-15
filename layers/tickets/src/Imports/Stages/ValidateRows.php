<?php

namespace Layers\Tickets\Imports\Stages;

use Closure;
use Illuminate\Support\Facades\Validator;
use Layers\Tickets\Imports\TicketImportPayload;
use Layers\Tickets\Validation\TicketRules;

final class ValidateRows
{
    public function handle(TicketImportPayload $payload, Closure $next): TicketImportPayload
    {
        $accepted = [];

        foreach ($payload->rows as $row) {
            $validator = Validator::make($row, TicketRules::forCreation() + [
                'requester_email' => ['required', 'email'],
            ], TicketRules::messages());

            $validator->fails()
                ? $payload->reject($row['line'], (string) $validator->errors()->first())
                : $accepted[] = $row;
        }

        $payload->rows = $accepted;

        return $next($payload);
    }
}
