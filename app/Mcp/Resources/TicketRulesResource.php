<?php

namespace App\Mcp\Resources;

use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Resource;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Validation\TicketRules;

#[Name('ticket-rules')]
#[Description('What opening a ticket requires, so an agent fills it without guessing.')]
final class TicketRulesResource extends Resource
{
    public function handle(Request $request): Response
    {
        return Response::json([
            'fields' => [
                'title' => [
                    'required' => true,
                    'max_length' => TicketRules::TITLE_MAX,
                ],
                'description' => [
                    'required' => true,
                ],
                'priority' => [
                    'required' => true,
                    'allowed' => array_column(TicketPriority::cases(), 'value'),
                ],
            ],
            'statuses' => array_column(TicketStatus::cases(), 'value'),
            'transitions' => array_reduce(
                TicketStatus::cases(),
                static fn (array $carried, TicketStatus $status): array => $carried + [
                    $status->value => array_column($status->allowedTransitions(), 'value'),
                ],
                [],
            ),
        ]);
    }
}
