<?php

use App\Mcp\Servers\TicketServer;
use Laravel\Mcp\Facades\Mcp;

Mcp::web('mcp/tickets', TicketServer::class)
    ->middleware('auth:sanctum')
    ->name('mcp.tickets');
