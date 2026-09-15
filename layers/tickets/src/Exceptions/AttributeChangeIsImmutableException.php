<?php

namespace Layers\Tickets\Exceptions;

use RuntimeException;

final class AttributeChangeIsImmutableException extends RuntimeException
{
    public function __construct()
    {
        parent::__construct('An attribute change is a journal entry and cannot be altered.');
    }
}
