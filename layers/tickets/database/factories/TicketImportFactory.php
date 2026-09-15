<?php

namespace Layers\Tickets\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Layers\Tickets\Models\TicketImport;

/**
 * @extends Factory<TicketImport>
 */
final class TicketImportFactory extends Factory
{
    protected $model = TicketImport::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uploaded_by_id' => User::factory(),
            'disk' => 'local',
            'path' => 'imports/'.faker()->uuid().'.csv',
            'rows_read' => 0,
            'rows_created' => 0,
            'rejections' => [],
            'completed_at' => null,
        ];
    }
}
