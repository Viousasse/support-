<?php

namespace Layers\Tickets\Database\Seeders;

use App\Models\User;
use Database\Seeders\PermissionSeeder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Layers\Tickets\Actions\AttachFileToTicket;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;

final class TicketsDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $requesters = User::role(PermissionSeeder::REQUESTER)->get();
        $technicians = User::role(PermissionSeeder::TECHNICIAN)->get();

        $seeded = 0;

        foreach (TicketStatus::cases() as $status) {
            foreach (TicketPriority::cases() as $priority) {
                $requester = $requesters[$seeded % $requesters->count()];
                $technician = $technicians[$seeded % $technicians->count()];
                $seeded++;

                $ticket = Ticket::factory()
                    ->withStatus($status)
                    ->withPriority($priority)
                    ->create([
                        'requester_id' => $requester->getKey(),
                        'assigned_technician_id' => $status === TicketStatus::Open
                            ? null
                            : $technician->getKey(),
                    ]);

                Comment::factory()
                    ->count(2)
                    ->create([
                        'ticket_id' => $ticket->getKey(),
                        'author_id' => $requester->getKey(),
                    ]);

                $this->seedAttachment($ticket->getKey(), $requester->getKey());
            }
        }
    }

    private function seedAttachment(int $ticketId, int $uploaderId): void
    {
        $path = 'tickets/'.$ticketId.'/specification.txt';

        Storage::disk(AttachFileToTicket::DISK)->put($path, faker()->paragraphs(paragraphs: 1));

        Attachment::factory()->create([
            'ticket_id' => $ticketId,
            'uploaded_by_id' => $uploaderId,
            'disk' => AttachFileToTicket::DISK,
            'path' => $path,
            'name' => 'specification.txt',
            'mime_type' => 'text/plain',
            'size' => Storage::disk(AttachFileToTicket::DISK)->size($path),
        ]);
    }
}
