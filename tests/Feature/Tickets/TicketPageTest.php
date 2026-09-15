<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketPageTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_renders_the_ticket_list_page(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $ticket = Ticket::factory()->create(['title' => 'A rendered ticket']);

        $this->actingAs($manager)
            ->get(route('tickets.index'))
            ->assertSuccessful()
            ->assertSee($ticket->title);
    }

    #[Test]
    public function it_renders_the_ticket_form_page(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);
        $ticket = Ticket::factory()->create(['requester_id' => $requester->getKey()]);

        $this->actingAs($requester)
            ->get(route('tickets.edit', ['ticket' => $ticket]))
            ->assertSuccessful()
            ->assertSee($ticket->title, escape: false);
    }

    #[Test]
    public function it_sends_a_guest_away_from_the_ticket_pages(): void
    {
        $this->get(route('tickets.index'))->assertRedirect(route('login'));
    }
}
