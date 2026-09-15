<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\JsonSchema\Types\Type;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tool;
use Layers\Tickets\Models\Ticket;

#[Name('show-ticket')]
#[Description('Read a single ticket, within the perimeter of the signed in user.')]
final class ShowTicketTool extends Tool
{
    public function handle(Request $request): Response
    {
        $attributes = $request->validate([
            'ticket_id' => ['required', 'integer'],
        ]);

        $ticket = Ticket::query()
            ->controlled()
            ->with(['requester:id,name', 'assignedTechnician:id,name'])
            ->findOrFail($attributes['ticket_id']);

        return Response::json($ticket->only([
            'id', 'title', 'description', 'status', 'priority', 'created_at', 'resolved_at',
        ]));
    }

    /**
     * @return array<string, Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'ticket_id' => $schema->integer()
                ->description('The identifier of the ticket to read.')
                ->required(),
        ];
    }
}
