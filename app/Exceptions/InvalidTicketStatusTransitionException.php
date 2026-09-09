<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class InvalidTicketStatusTransitionException extends HttpException
{
    public function __construct()
    {
        parent::__construct(
            409,
            __('tickets.exceptions.invalid_status_transition'),
        );
    }
}