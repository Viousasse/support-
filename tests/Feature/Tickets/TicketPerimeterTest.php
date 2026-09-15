<?php

namespace Tests\Feature\Tickets;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketPerimeterTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_only_returns_the_own_tickets_of_a_requester(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);
        $own = Ticket::factory()->create(['requester_id' => $requester->getKey()]);
        Ticket::factory()->count(3)->create();

        $identifiers = $this->searchAs($requester);

        $this->assertSame([$own->getKey()], $identifiers);
    }

    #[Test]
    public function it_only_returns_the_assigned_tickets_of_a_technician(): void
    {
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $assigned = Ticket::factory()->assigned()->create([
            'assigned_technician_id' => $technician->getKey(),
        ]);
        Ticket::factory()->count(3)->create();

        $identifiers = $this->searchAs($technician);

        $this->assertSame([$assigned->getKey()], $identifiers);
    }

    #[Test]
    public function it_returns_every_ticket_to_a_manager(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        Ticket::factory()->count(3)->create();

        $identifiers = $this->searchAs($manager);

        $this->assertCount(3, $identifiers);
    }

    #[Test]
    public function it_loads_the_requester_and_the_comments_when_asked(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = Ticket::factory()->create();
        $comment = Comment::factory()->create(['ticket_id' => $ticket->getKey()]);

        $response = $this->actingAs($manager, 'sanctum')
            ->postJson(route('tickets.search'), [
                'search' => [
                    'includes' => [
                        ['relation' => 'requester'],
                        ['relation' => 'comments'],
                    ],
                ],
            ])
            ->assertSuccessful();

        $this->assertSame($ticket->requester->name, $response->json('data.0.requester.name'));
        $this->assertSame($comment->body, $response->json('data.0.comments.0.body'));
        $this->assertArrayNotHasKey('email', $response->json('data.0.requester'));
    }

    #[Test]
    public function it_returns_nothing_without_any_view_permission(): void
    {
        $stranger = $this->userWithPermissions(TicketPermission::Create);
        Ticket::factory()->count(3)->create();

        $this->actingAs($stranger, 'sanctum')
            ->postJson(route('tickets.search'), ['search' => []])
            ->assertForbidden();
    }

    /**
     * @return array<int, int>
     */
    private function searchAs(User $user): array
    {
        $response = $this->actingAs($user, 'sanctum')
            ->postJson(route('tickets.search'), ['search' => []])
            ->assertSuccessful();

        return array_column($response->json('data'), 'id');
    }
}
