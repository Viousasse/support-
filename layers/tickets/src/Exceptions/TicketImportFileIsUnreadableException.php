<?php

namespace Layers\Tickets\Exceptions;

use RuntimeException;

final class TicketImportFileIsUnreadableException extends RuntimeException
{
    public function __construct(string $path)
    {
        parent::__construct("The ticket import file [{$path}] cannot be read.");
    }
}
