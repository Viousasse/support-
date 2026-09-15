<?php

namespace App\Rest\Resources;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Lomkit\Rest\Actions\Action;
use Lomkit\Rest\Concerns\Resource\DisableAuthorizations;
use Lomkit\Rest\Http\Requests\RestRequest;
use Lomkit\Rest\Instructions\Instruction;
use Lomkit\Rest\Relations\Relation;

final class UserResource extends Resource
{
    use DisableAuthorizations;

    /**
     * The model the resource corresponds to.
     *
     * @var class-string<Model>
     */
    public static $model = User::class;

    /**
     * @return array<int, string>
     */
    public function fields(RestRequest $request): array
    {
        return [
            'id',
            'name',
        ];
    }

    /**
     * @return array<int, Relation>
     */
    public function relations(RestRequest $request): array
    {
        return [];
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
}
