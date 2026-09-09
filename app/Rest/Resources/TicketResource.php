<?php

namespace App\Rest\Resources;

//use Lomkit\Rest\Concerns\Resource\DisableAuthorizations;
use Lomkit\Rest\Http\Requests\RestRequest;
use Lomkit\Rest\Relations\BelongsTo;
use Lomkit\Rest\Relations\HasMany;
use App\Rest\Resources\UserResource;
use App\Rest\Resources\CommentResource;
use Layers\Tickets\Models\Ticket;

class TicketResource extends Resource
{
    //use DisableAuthorizations;
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\Illuminate\Database\Eloquent\Model>
     */
    public static $model = \Layers\Tickets\Models\Ticket::class;

    /**
     * The exposed fields that could be provided.
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
            'requester_id',
        ];
    }

    /**
     * The exposed relations that could be provided.
     */
    public function relations(RestRequest $request): array
{
    return [
        BelongsTo::make('requester', UserResource::class),
        BelongsTo::make('assignedTechnician', UserResource::class),
        HasMany::make('comments',  CommentResource::class),
    ];
}

    /**
     * The exposed scopes that could be provided.
     */
    public function scopes(RestRequest $request): array
    {
        return [
        'controlled' => fn ($query) => $query->controlled(),
    ];
    }

    /**
     * The exposed limits that could be provided.
     */
    public function limits(RestRequest $request): array
    {
        return [
            10,
            25,
            50,
        ];
    }

    /**
     * The actions that should be linked.
     */
    public function actions(RestRequest $request): array
    {
        return [];
    }

    /**
     * The instructions that should be linked.
     */
    public function instructions(RestRequest $request): array
    {
        return [];
    }
    public function indexQuery(): \Illuminate\Database\Eloquent\Builder
{
    return Ticket::controlled();
}
public function searchQuery(\Lomkit\Rest\Http\Requests\RestRequest $request, \Illuminate\Contracts\Database\Eloquent\Builder $query) {
    return $query->controlled();
}
}