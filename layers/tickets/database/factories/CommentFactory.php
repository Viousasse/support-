<?php

namespace Layers\Tickets\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;

/**
 * @extends Factory<Comment>
 */
class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'ticket_id' => Ticket::factory(),
            'author_id' => User::factory(),
            'body' => faker()->paragraphs(paragraphs: 1),
        ];
    }
}
