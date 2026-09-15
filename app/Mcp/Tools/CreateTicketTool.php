<?php

namespace App\Mcp\Tools;

use App\Models\User;
use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\JsonSchema\Types\Type;
use Illuminate\Support\Facades\Gate;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tool;
use Layers\Tickets\Actions\CreateTicket;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Validation\TicketRules;

#[Name('create-ticket')]
#[Description('Open a ticket on behalf of the signed in user.')]
final class CreateTicketTool extends Tool
{
    public function handle(Request $request, CreateTicket $action): Response
    {
        Gate::authorize('create', Ticket::class);

        $validated = $request->validate(TicketRules::forCreation(), TicketRules::messages());

        /** @var User $requester */
        $requester = $request->user();

        $ticket = $action->execute([
            'title' => (string) $validated['title'],
            'description' => (string) $validated['description'],
            'priority' => (string) $validated['priority'],
        ], $requester);

        return Response::json($ticket->only(['id', 'title', 'status', 'priority']));
    }

    /**
     * @return array<string, Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'title' => $schema->string()
                ->max(TicketRules::TITLE_MAX)
                ->description('A short summary of the problem.')
                ->required(),
            'description' => $schema->string()
                ->description('What happened, in full.')
                ->required(),
            'priority' => $schema->string()
                ->enum(array_column(TicketPriority::cases(), 'value'))
                ->description('How urgent the ticket is.')
                ->required(),
        ];
    }
}
