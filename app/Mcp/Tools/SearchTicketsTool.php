<?php

namespace App\Mcp\Tools;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\JsonSchema\Types\Type;
use Laravel\Mcp\Request;
use Laravel\Mcp\Response;
use Laravel\Mcp\Server\Attributes\Description;
use Laravel\Mcp\Server\Attributes\Name;
use Laravel\Mcp\Server\Tool;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

#[Name('search-tickets')]
#[Description('Search the tickets the signed in user is allowed to see.')]
final class SearchTicketsTool extends Tool
{
    public const LIMIT = 25;

    public function handle(Request $request): Response
    {
        $filters = $request->validate([
            'status' => ['nullable', 'string', 'in:'.implode(',', array_column(TicketStatus::cases(), 'value'))],
            'priority' => ['nullable', 'string', 'in:'.implode(',', array_column(TicketPriority::cases(), 'value'))],
        ]);

        $tickets = Ticket::query()
            ->controlled()
            ->when(
                filled($filters['status'] ?? null),
                fn (Builder $query): Builder => $query->where('status', $filters['status']),
            )
            ->when(
                filled($filters['priority'] ?? null),
                fn (Builder $query): Builder => $query->where('priority', $filters['priority']),
            )
            ->latest()
            ->limit(self::LIMIT)
            ->get(['id', 'title', 'status', 'priority', 'created_at']);

        return Response::json($tickets->toArray());
    }

    /**
     * @return array<string, Type>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'status' => $schema->string()
                ->enum(array_column(TicketStatus::cases(), 'value'))
                ->description('Restrict the search to a single status.'),
            'priority' => $schema->string()
                ->enum(array_column(TicketPriority::cases(), 'value'))
                ->description('Restrict the search to a single priority.'),
        ];
    }
}
