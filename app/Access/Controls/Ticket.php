<?php

namespace App\Access\Controls;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Layers\Tickets\Models\Ticket as TicketModel;
use Lomkit\Access\Controls\Control;
use Lomkit\Access\Perimeters\Perimeter;

class Ticket extends Control
{
    protected string $model = TicketModel::class;

    protected function perimeters(): array
    {
        return [
            Perimeter::new()
                ->allowed(fn (Model $user, string $method) => $user->can('view all tickets'))
                ->should(fn (Model $user, Model $model) => true)
                ->query(fn (Builder $query, Model $user) => $query),

            Perimeter::new()
                ->allowed(fn (Model $user, string $method) => $user->can('view assigned tickets'))
                ->should(fn (Model $user, Model $model) => $model->assignedTechnician()->is($user))
                ->query(fn (Builder $query, Model $user) => $query->where('assigned_technician_id', $user->getKey())),

            Perimeter::new()
                ->allowed(fn (Model $user, string $method) => $user->can('view own tickets'))
                ->should(fn (Model $user, Model $model) => $model->requester()->is($user))
                ->query(fn (Builder $query, Model $user) => $query->where('requester_id', $user->getKey())),
        ];
    }
}