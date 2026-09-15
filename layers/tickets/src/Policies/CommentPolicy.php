<?php

namespace Layers\Tickets\Policies;

use App\Access\Controls\CommentControl;
use Layers\Tickets\Models\Comment;
use Lomkit\Access\Policies\ControlledPolicy;

final class CommentPolicy extends ControlledPolicy
{
    protected string $model = Comment::class;

    protected string $control = CommentControl::class;
}
