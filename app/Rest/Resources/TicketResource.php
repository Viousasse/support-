<?php

namespace App\Rest\Resources;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Layers\Tickets\Models\Ticket;
use Lomkit\Rest\Actions\Action;
use Lomkit\Rest\Http\Requests\MutateRequest;
use Lomkit\Rest\Http\Requests\RestRequest;
use Lomkit\Rest\Instructions\Instruction;
use Lomkit\Rest\Relations\BelongsTo;
use Lomkit\Rest\Relations\HasMany;
use Lomkit\Rest\Relations\Relation;

final class TicketResource extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<Model>
     */
    public static $model = Ticket::class;

    /**
     * @return array<int, string>
     */
    public function fields(RestRequest $request): array
    {
        return [
            'id',
            'title',
            'description',
            'status',
            'priority',
            'created_at',
            'resolved_at',
        ];
    }

    /**
     * @return array<int, Relation>
     */
    public function relations(RestRequest $request): array
    {
        return [
            BelongsTo::make('requester', UserResource::class),
            BelongsTo::make('assignedTechnician', UserResource::class),
            HasMany::make('comments', CommentResource::class),
            HasMany::make('attachments', AttachmentResource::class),
        ];
    }

    /**
     * @return array<int, string>
     */
    public function scopes(RestRequest $request): array
    {
        return [];
    }

    /**
     * @return array<int, int>
     */
    public function limits(RestRequest $request): array
    {
        return [10, 25, 50];
    }

    /**
     * @return array<int, Action>
     */
    public function actions(RestRequest $request): array
    {
        return [];
    }

    /**
     * @return array<int, Instruction>
     */
    public function instructions(RestRequest $request): array
    {
        return [];
    }

    /**
     * @return array<string, string>
     */
    public function defaultOrderBy(RestRequest $request): array
    {
        return ['created_at' => 'desc'];
    }

    public function searchQuery(RestRequest $request, Builder $query): Builder
    {
        return $query->controlled();
    }

    /**
     * @param  array<string, mixed>  $requestBody
     */
    public function mutating(MutateRequest $request, array $requestBody, Model $ticket): void
    {
        if ($ticket->exists) {
            return;
        }

        /** @var Ticket $ticket */
        $ticket->requester()->associate($request->user());
    }
}
