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
use Layers\Tickets\Actions\AssignTicket;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Exceptions\InvalidTicketStatusTransitionException;
use Layers\Tickets\Models\Ticket;

#[Name('assign-ticket')]
#[Description('Assign a ticket to a technician, following the lifecycle rules.')]
final class AssignTicketTool extends Tool
{
    public function handle(Request $request, AssignTicket $action): Response
    {
        Gate::authorize(TicketPermission::Assign->value);

        $attributes = $request->validate([
            'ticket_id' => ['required', 'integer'],
            'technician_id' => ['required', 'integer'],
        ]);

        $ticket = Ticket::query()->controlled()->findOrFail($attributes['ticket_id']);
        $technician = User::query()->whereKey($attributes['technician_id'])->firstOrFail();

        try {
            $action->execute($ticket, $technician);
        } catch (InvalidTicketStatusTransitionException $refused) {
            return Response::error($refused->getMessage());
        }

        return Response::json($ticket->only(['id', 'status']));
    }

    /**
     * @return array<string, Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'ticket_id' => $schema->integer()
                ->description('The identifier of the ticket to assign.')
                ->required(),
            'technician_id' => $schema->integer()
                ->description('The identifier of the technician taking the ticket.')
                ->required(),
        ];
    }
}
