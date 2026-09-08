<?php

namespace App\Rest\Resources;

use Lomkit\Rest\Http\Requests\RestRequest;

class CommentResource extends Resource
{
    public static $model = \Layers\Tickets\Models\Comment::class;

    public function fields(RestRequest $request): array
    {
        return [
            'id',
            'body',
            'created_at',
        ];
    }

    public function relations(RestRequest $request): array
    {
        return [];
    }

    public function scopes(RestRequest $request): array
    {
        return [];
    }

    public function limits(RestRequest $request): array
    {
        return [
            10,
            25,
            50,
        ];
    }

    public function actions(RestRequest $request): array
    {
        return [];
    }

    public function instructions(RestRequest $request): array
    {
        return [];
    }
}