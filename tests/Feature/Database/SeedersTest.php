<?php

namespace Tests\Feature\Database;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Database\Seeders\PermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class SeedersTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_seeds_every_status_every_priority_and_their_children(): void
    {
        $this->seed(DatabaseSeeder::class);

        foreach (TicketStatus::cases() as $status) {
            $this->assertTrue(
                Ticket::query()->where('status', $status)->exists(),
                "No seeded ticket carries the {$status->value} status.",
            );
        }

        foreach (TicketPriority::cases() as $priority) {
            $this->assertTrue(
                Ticket::query()->where('priority', $priority)->exists(),
                "No seeded ticket carries the {$priority->value} priority.",
            );
        }

        $this->assertGreaterThan(0, Comment::query()->count());
        $this->assertGreaterThan(0, Attachment::query()->count());
    }

    #[Test]
    public function it_seeds_a_dataset_where_the_three_perimeters_differ(): void
    {
        $this->seed(DatabaseSeeder::class);

        $total = Ticket::query()->count();

        $this->assertLessThan($total, $this->visibleTicketsFor(PermissionSeeder::REQUESTER));
        $this->assertLessThan($total, $this->visibleTicketsFor(PermissionSeeder::TECHNICIAN));
        $this->assertSame($total, $this->visibleTicketsFor(PermissionSeeder::MANAGER));
    }

    private function visibleTicketsFor(string $role): int
    {
        Auth::login(User::role($role)->firstOrFail());

        $visible = Ticket::query()->controlled()->count();

        Auth::logout();

        return $visible;
    }
}
