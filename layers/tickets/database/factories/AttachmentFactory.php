<?php

namespace Layers\Tickets\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Ticket;

/**
 * @extends Factory<Attachment>
 */
final class AttachmentFactory extends Factory
{
    protected $model = Attachment::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = faker()->words(words: 2).'.txt';

        return [
            'ticket_id' => Ticket::factory(),
            'uploaded_by_id' => User::factory(),
            'disk' => 'local',
            'path' => 'tickets/'.faker()->uuid().'/'.$name,
            'name' => $name,
            'mime_type' => 'text/plain',
            'size' => faker()->number(min: 128, max: 65536),
        ];
    }
}
