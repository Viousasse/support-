<?php

namespace Tests\Feature\Extensions;

use App\Mcp\Resources\TicketRulesResource;
use App\Mcp\Servers\TicketServer;
use App\Mcp\Tools\AssignTicketTool;
use App\Mcp\Tools\CreateTicketTool;
use App\Mcp\Tools\SearchTicketsTool;
use App\Mcp\Tools\ShowTicketTool;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketMcpServerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function an_agent_signed_in_as_a_requester_only_searches_their_own_tickets(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);
        $own = Ticket::factory()->create([
            'requester_id' => $requester->getKey(),
            'title' => 'A ticket of mine',
        ]);
        Ticket::factory()->create(['title' => 'A ticket of somebody else']);

        TicketServer::actingAs($requester)
            ->tool(SearchTicketsTool::class)
            ->assertOk()
            ->assertSee($own->title)
            ->assertDontSee('A ticket of somebody else');
    }

    #[Test]
    public function a_manager_searches_every_ticket_and_can_filter(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        Ticket::factory()->withStatus(TicketStatus::Closed)->create(['title' => 'A closed one']);
        Ticket::factory()->create(['title' => 'An open one']);

        TicketServer::actingAs($manager)
            ->tool(SearchTicketsTool::class, ['status' => TicketStatus::Closed->value])
            ->assertOk()
            ->assertSee('A closed one')
            ->assertDontSee('An open one');
    }

    #[Test]
    public function it_refuses_a_filter_that_is_not_a_known_status(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);

        TicketServer::actingAs($manager)
            ->tool(SearchTicketsTool::class, ['status' => 'exploded'])
            ->assertHasErrors();
    }

    #[Test]
    public function it_reads_a_ticket_inside_the_perimeter_and_hides_the_others(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);
        $own = Ticket::factory()->create(['requester_id' => $requester->getKey()]);
        $other = Ticket::factory()->create();

        TicketServer::actingAs($requester)
            ->tool(ShowTicketTool::class, ['ticket_id' => $own->getKey()])
            ->assertOk()
            ->assertSee($own->title);

        TicketServer::actingAs($requester)
            ->tool(ShowTicketTool::class, ['ticket_id' => $other->getKey()])
            ->assertHasErrors();
    }

    #[Test]
    public function it_opens_a_ticket_through_the_same_action_as_the_interface(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);

        TicketServer::actingAs($requester)
            ->tool(CreateTicketTool::class, [
                'title' => 'The lift is stuck',
                'description' => 'Between the second and the third floor.',
                'priority' => TicketPriority::High->value,
            ])
            ->assertOk();

        $ticket = Ticket::query()->sole();

        $this->assertSame('The lift is stuck', $ticket->title);
        $this->assertSame($requester->getKey(), $ticket->requester_id);
        $this->assertSame(TicketStatus::Open, $ticket->status);
    }

    #[Test]
    public function it_refuses_to_open_a_ticket_without_the_create_permission(): void
    {
        $user = $this->userWithPermissions(TicketPermission::ViewOwn);

        TicketServer::actingAs($user)
            ->tool(CreateTicketTool::class, [
                'title' => 'The lift is stuck',
                'description' => 'Between the second and the third floor.',
                'priority' => TicketPriority::High->value,
            ])
            ->assertHasErrors();

        $this->assertSame(0, Ticket::query()->count());
    }

    #[Test]
    public function it_tells_the_agent_why_a_transition_was_refused(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $closed = Ticket::factory()->withStatus(TicketStatus::Closed)->create();

        TicketServer::actingAs($manager)
            ->tool(AssignTicketTool::class, [
                'ticket_id' => $closed->getKey(),
                'technician_id' => $technician->getKey(),
            ])
            ->assertHasErrors()
            ->assertSee(TicketStatus::Closed->value);

        $this->assertSame(TicketStatus::Closed, $closed->fresh()->status);
    }

    #[Test]
    public function it_assigns_a_ticket_through_the_lifecycle_action(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        TicketServer::actingAs($manager)
            ->tool(AssignTicketTool::class, [
                'ticket_id' => $ticket->getKey(),
                'technician_id' => $technician->getKey(),
            ])
            ->assertOk();

        $this->assertSame(TicketStatus::Assigned, $ticket->fresh()->status);
    }

    #[Test]
    public function it_publishes_the_ticket_rules_so_the_agent_does_not_guess(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);

        TicketServer::actingAs($requester)
            ->resource(TicketRulesResource::class)
            ->assertOk()
            ->assertSee(TicketPriority::Critical->value)
            ->assertSee(TicketStatus::InProgress->value);
    }
}
