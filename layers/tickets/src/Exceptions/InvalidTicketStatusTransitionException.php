<?php

namespace Layers\Tickets\Exceptions;

use Layers\Tickets\Enums\TicketStatus;
use Symfony\Component\HttpKernel\Exception\ConflictHttpException;

final class InvalidTicketStatusTransitionException extends ConflictHttpException
{
    public function __construct(
        public readonly TicketStatus $from,
        public readonly TicketStatus $to,
    ) {
        parent::__construct(__('tickets.exceptions.invalid_status_transition', [
            'from' => $from->value,
            'to' => $to->value,
        ]));
    }
}
