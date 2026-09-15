<?php

namespace Tests\Feature\Tickets;

use App\Livewire\Tickets\TicketList;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;
use Livewire\Livewire;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketListTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_only_lists_the_tickets_the_user_may_see(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);
        $own = Ticket::factory()->create([
            'requester_id' => $requester->getKey(),
            'title' => 'A ticket of mine',
        ]);
        $other = Ticket::factory()->create(['title' => 'A ticket of somebody else']);

        Livewire::actingAs($requester)
            ->test(TicketList::class)
            ->assertSee($own->title)
            ->assertDontSee($other->title);
    }

    #[Test]
    public function it_filters_on_the_status_and_returns_to_the_first_page(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        Ticket::factory()->count(TicketList::PER_PAGE + 1)->withStatus(TicketStatus::Open)->create();
        $closed = Ticket::factory()->withStatus(TicketStatus::Closed)->create([
            'title' => 'A closed ticket on the second page',
        ]);

        Livewire::actingAs($manager)
            ->test(TicketList::class)
            ->call('setPage', 2)
            ->set('status', TicketStatus::Closed->value)
            ->assertSee($closed->title);
    }

    #[Test]
    public function it_filters_on_the_priority(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $critical = Ticket::factory()->withPriority(TicketPriority::Critical)->create([
            'title' => 'A critical ticket',
        ]);
        $low = Ticket::factory()->withPriority(TicketPriority::Low)->create([
            'title' => 'A low priority ticket',
        ]);

        Livewire::actingAs($manager)
            ->test(TicketList::class)
            ->set('priority', TicketPriority::Critical->value)
            ->assertSee($critical->title)
            ->assertDontSee($low->title);
    }

    #[Test]
    public function it_reverses_the_direction_when_the_same_column_is_clicked_twice(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);

        Livewire::actingAs($manager)
            ->test(TicketList::class)
            ->call('sortBy', 'title')
            ->assertSet('sortColumn', 'title')
            ->assertSet('sortDirection', 'asc')
            ->call('sortBy', 'title')
            ->assertSet('sortDirection', 'desc');
    }

    #[Test]
    public function it_refuses_a_column_that_is_not_whitelisted(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);

        Livewire::actingAs($manager)
            ->test(TicketList::class)
            ->call('sortBy', 'password')
            ->assertSet('sortColumn', 'created_at')
            ->assertSet('sortDirection', 'desc')
            ->assertSuccessful();
    }

    #[Test]
    public function it_keeps_the_query_count_independent_from_the_number_of_rows(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $this->countQueriesForTickets($manager, 1);

        $queriesForOne = $this->countQueriesForTickets($manager, 1);
        $queriesForTen = $this->countQueriesForTickets($manager, 10);

        $this->assertSame($queriesForOne, $queriesForTen);
        $this->assertLessThanOrEqual(3, $queriesForTen);
    }

    private function countQueriesForTickets(User $manager, int $count): int
    {
        Comment::query()->delete();
        Ticket::query()->forceDelete();

        Ticket::factory()
            ->count($count)
            ->create()
            ->each(fn (Ticket $ticket) => Comment::factory()->create(['ticket_id' => $ticket->getKey()]));

        DB::connection()->enableQueryLog();
        DB::connection()->flushQueryLog();

        Livewire::actingAs($manager)->test(TicketList::class)->assertSuccessful();

        return count(DB::connection()->getQueryLog());
    }
}
