<?php

namespace Tests\Feature\Extensions;

use App\Livewire\Tickets\TicketList;
use App\Models\User;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Layers\Tickets\Actions\AssignTicket;
use Layers\Tickets\Broadcasting\TicketAudience;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Models\Ticket;
use Livewire\Livewire;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketBroadcastTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Channels are registered on the broadcaster in use, and the null driver
     * of the test suite authorises everything. The real driver has to be in
     * place before the application boots for the channel rules to be exercised.
     */
    protected function setUp(): void
    {
        putenv('BROADCAST_CONNECTION=pusher');
        $_ENV['BROADCAST_CONNECTION'] = 'pusher';

        parent::setUp();
    }

    protected function tearDown(): void
    {
        putenv('BROADCAST_CONNECTION');
        unset($_ENV['BROADCAST_CONNECTION']);

        parent::tearDown();
    }

    #[Test]
    public function it_broadcasts_the_domain_event_of_the_lifecycle(): void
    {
        $this->assertInstanceOf(
            ShouldBroadcast::class,
            new TicketAssigned(Ticket::factory()->create(), User::factory()->create()),
        );
    }

    #[Test]
    public function it_publishes_only_on_the_channels_of_the_users_allowed_to_see_the_ticket(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);
        $stranger = $this->userWithPermissions(TicketPermission::ViewOwn);

        $ticket = Ticket::factory()->create([
            'requester_id' => $requester->getKey(),
            'assigned_technician_id' => $technician->getKey(),
        ]);

        $channels = array_map(
            static fn (object $channel): string => (string) $channel,
            (new TicketAssigned($ticket, $technician))->broadcastOn(),
        );

        foreach ([$requester, $technician, $manager] as $allowed) {
            $this->assertContains(
                'private-'.TicketAudience::channelFor($allowed->getKey()),
                $channels,
            );
        }

        $this->assertNotContains(
            'private-'.TicketAudience::channelFor($stranger->getKey()),
            $channels,
        );
    }

    #[Test]
    public function it_authorizes_a_user_on_their_own_channel_only(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/broadcasting/auth', [
                'socket_id' => '1234.5678',
                'channel_name' => 'private-'.TicketAudience::channelFor($other->getKey()),
            ])
            ->assertForbidden();

        $this->actingAs($user)
            ->postJson('/broadcasting/auth', [
                'socket_id' => '1234.5678',
                'channel_name' => 'private-'.TicketAudience::channelFor($user->getKey()),
            ])
            ->assertSuccessful();
    }

    #[Test]
    public function it_refuses_a_guest_on_a_private_channel(): void
    {
        $user = User::factory()->create();

        $this->postJson('/broadcasting/auth', [
            'socket_id' => '1234.5678',
            'channel_name' => 'private-'.TicketAudience::channelFor($user->getKey()),
        ])->assertUnauthorized();
    }

    #[Test]
    public function the_list_listens_on_the_channel_of_the_signed_in_user(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);

        $listeners = Livewire::actingAs($manager)
            ->test(TicketList::class)
            ->instance()
            ->getListeners();

        $this->assertArrayHasKey(
            'echo-private:'.TicketAudience::channelFor($manager->getKey()).',.TicketAssigned',
            $listeners,
        );
    }

    #[Test]
    public function it_broadcasts_when_a_ticket_is_assigned(): void
    {
        Event::fake([TicketAssigned::class]);

        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        $this->actingAs($manager);
        app(AssignTicket::class)->execute($ticket, $technician);

        Event::assertDispatched(TicketAssigned::class);
    }
}
