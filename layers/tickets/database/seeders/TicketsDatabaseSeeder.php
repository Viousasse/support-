<?php

namespace Layers\Tickets\Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;

class TicketsDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $requester = User::factory()->create();
        $technician = User::factory()->create();
        $manager = User::factory()->create();

        foreach (TicketStatus::cases() as $index => $status) {
            $ticket = Ticket::factory()
                ->state([
                    'requester_id' => $requester->id,
                    'assigned_technician_id' => $status === TicketStatus::Open
                        ? null
                        : $technician->id,
                    'status' => $status,
                    'priority' => TicketPriority::cases()[
                        $index % count(TicketPriority::cases())
                    ],
                    'resolved_at' => in_array(
                        $status,
                        [TicketStatus::Resolved, TicketStatus::Closed],
                        true,
                    )
                        ? now()
                        : null,
                ])
                ->create();

            Comment::factory()
                ->count(2)
                ->state([
                    'ticket_id' => $ticket->id,
                    'author_id' => $requester->id,
                ])
                ->create();
        }

        foreach (TicketPriority::cases() as $priority) {
            Ticket::factory()
                ->assigned()
                ->state([
                    'requester_id' => $requester->id,
                    'assigned_technician_id' => $technician->id,
                    'priority' => $priority,
                ])
                ->create();
        }
    }
}