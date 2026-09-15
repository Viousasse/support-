<?php

namespace Tests\Feature\Extensions;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Notifications\Channels\ManagerAlertChannel;
use Layers\Tickets\Notifications\Channels\UrgencyChannel;
use Layers\Tickets\Notifications\Policies\TicketNotificationPolicies;
use Layers\Tickets\Notifications\TicketAssignedNotification;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketNotificationPolicyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @return array<string, array{TicketPriority, array<int, string>}>
     */
    public static function channelsByPriority(): array
    {
        return [
            'low' => [TicketPriority::Low, ['mail']],
            'normal' => [TicketPriority::Normal, ['mail']],
            'high' => [TicketPriority::High, ['mail', UrgencyChannel::class]],
            'critical' => [
                TicketPriority::Critical,
                ['mail', UrgencyChannel::class, ManagerAlertChannel::class],
            ],
        ];
    }

    /**
     * @param  array<int, string>  $expected
     */
    #[Test]
    #[DataProvider('channelsByPriority')]
    public function it_routes_each_priority_to_its_channels(TicketPriority $priority, array $expected): void
    {
        $ticket = Ticket::factory()->create(['priority' => $priority]);
        $technician = User::factory()->create();

        $this->assertSame($expected, (new TicketAssignedNotification($ticket))->via($technician));
    }

    #[Test]
    public function it_falls_back_to_the_standard_policy_for_an_unclaimed_priority(): void
    {
        $policies = app(TicketNotificationPolicies::class);

        foreach (TicketPriority::cases() as $priority) {
            $this->assertNotEmpty($policies->for($priority)->channels());
        }

        $this->assertSame(['mail'], $policies->for(TicketPriority::Low)->channels());
    }

    #[Test]
    public function it_writes_the_urgency_payload_on_a_high_priority_ticket(): void
    {
        Log::spy();

        $ticket = Ticket::factory()->create(['priority' => TicketPriority::High]);
        $technician = User::factory()->create();

        $technician->notify(new TicketAssignedNotification($ticket));

        Log::shouldHaveReceived('warning')->once()->withArgs(
            fn (string $message, array $context): bool => $context['ticket_id'] === $ticket->getKey()
                && $context['priority'] === TicketPriority::High->value,
        );
    }

    #[Test]
    public function it_alerts_on_a_critical_ticket(): void
    {
        Log::spy();

        $ticket = Ticket::factory()->create(['priority' => TicketPriority::Critical]);
        $technician = User::factory()->create();

        $technician->notify(new TicketAssignedNotification($ticket));

        Log::shouldHaveReceived('critical')->once();
        Log::shouldHaveReceived('warning')->once();
    }
}
