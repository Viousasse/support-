<?php

namespace Layers\Tickets\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Layers\Tickets\Models\AttributeChange;
use Layers\Tickets\Models\Ticket;

/**
 * @extends Factory<AttributeChange>
 */
final class AttributeChangeFactory extends Factory
{
    protected $model = AttributeChange::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'recordable_type' => Ticket::class,
            'recordable_id' => Ticket::factory(),
            'author_id' => User::factory(),
            'attribute' => 'status',
            'old_value' => faker()->words(words: 1),
            'new_value' => faker()->words(words: 1),
        ];
    }
}
