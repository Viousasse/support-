<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class PruneTicketsTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_prunes_a_ticket_and_its_children_past_the_retention_period(): void
    {
        $ticket = Ticket::factory()->create();
        Comment::factory()->create(['ticket_id' => $ticket->getKey()]);
        Attachment::factory()->create(['ticket_id' => $ticket->getKey()]);

        $ticket->delete();

        Ticket::withTrashed()
            ->whereKey($ticket->getKey())
            ->update(['deleted_at' => now()->subDays(Ticket::RETENTION_DAYS + 1)]);

        $this->artisan('model:prune', ['--model' => [Ticket::class]])->assertSuccessful();

        $this->assertSame(0, Ticket::withTrashed()->count());
        $this->assertSame(0, Comment::query()->count());
        $this->assertSame(0, Attachment::query()->count());
    }

    #[Test]
    public function it_keeps_a_ticket_that_is_still_inside_the_retention_period(): void
    {
        $ticket = Ticket::factory()->create();
        $ticket->delete();

        $this->artisan('model:prune', ['--model' => [Ticket::class]])->assertSuccessful();

        $this->assertSame(1, Ticket::withTrashed()->count());
    }
}
