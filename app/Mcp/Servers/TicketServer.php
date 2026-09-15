<?php

namespace App\Mcp\Servers;

use App\Mcp\Resources\TicketRulesResource;
use App\Mcp\Tools\AssignTicketTool;
use App\Mcp\Tools\CreateTicketTool;
use App\Mcp\Tools\SearchTicketsTool;
use App\Mcp\Tools\ShowTicketTool;
use Laravel\Mcp\Server;
use Laravel\Mcp\Server\Attributes\Instructions;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Attributes\Version;

#[Name('Support Tickets')]
#[Version('1.0.0')]
#[Instructions(
    'Read and open support tickets. Every call runs as the authenticated user, '.
    'who only ever sees the tickets their perimeter allows. Read the ticket '.
    'rules resource before opening a ticket.'
)]
final class TicketServer extends Server
{
    protected array $tools = [
        SearchTicketsTool::class,
        ShowTicketTool::class,
        CreateTicketTool::class,
        AssignTicketTool::class,
    ];

    protected array $resources = [
        TicketRulesResource::class,
    ];

    protected array $prompts = [];
}
