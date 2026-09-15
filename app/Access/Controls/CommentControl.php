<?php

namespace App\Access\Controls;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Models\Comment;
use Lomkit\Access\Controls\Control;
use Lomkit\Access\Perimeters\Perimeter;

final class CommentControl extends Control
{
    protected string $model = Comment::class;

    /**
     * @return array<int, Perimeter>
     */
    protected function perimeters(): array
    {
        return [
            Perimeter::new()
                ->allowed(fn (User $user, string $method): bool => TicketPermission::ViewAny->allows($user, $method)),

            Perimeter::new()
                ->allowed(fn (User $user, string $method): bool => TicketPermission::ViewAssigned->allows($user, $method))
                ->should(fn (User $user, Comment $comment): bool => $comment->ticket->assigned_technician_id === $user->getKey())
                ->query(fn (Builder $query, User $user): Builder => $this->whereTicket($query, 'assigned_technician_id', $user)),

            Perimeter::new()
                ->allowed(fn (User $user, string $method): bool => TicketPermission::ViewOwn->allows($user, $method))
                ->should(fn (User $user, Comment $comment): bool => $comment->ticket->requester_id === $user->getKey())
                ->query(fn (Builder $query, User $user): Builder => $this->whereTicket($query, 'requester_id', $user)),
        ];
    }

    /**
     * @param  Builder<Comment>  $query
     * @return Builder<Comment>
     */
    private function whereTicket(Builder $query, string $column, User $user): Builder
    {
        return $query->whereHas(
            'ticket',
            fn (Builder $ticket): Builder => $ticket->where($column, $user->getKey()),
        );
    }
}
