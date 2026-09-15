<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class ExportTicketsTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_exports_the_resolved_tickets_of_the_month(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny);

        $resolved = Ticket::factory()->withPriority(TicketPriority::High)->create([
            'title' => 'Resolved this month',
            'status' => TicketStatus::Resolved,
            'resolved_at' => now(),
        ]);
        Ticket::factory()->create(['title' => 'Still open']);
        Ticket::factory()->create([
            'title' => 'Resolved last month',
            'status' => TicketStatus::Resolved,
            'resolved_at' => now()->subMonthNoOverflow()->startOfMonth(),
        ]);

        $csv = $this->actingAs($manager, 'sanctum')
            ->get(route('tickets.export'))
            ->assertSuccessful()
            ->streamedContent();

        $this->assertStringContainsString('id,title,priority,resolved_at', $csv);
        $this->assertStringContainsString($resolved->title, $csv);
        $this->assertStringContainsString(TicketPriority::High->value, $csv);
        $this->assertStringNotContainsString('Still open', $csv);
        $this->assertStringNotContainsString('Resolved last month', $csv);
    }

    #[Test]
    public function it_only_exports_the_tickets_inside_the_perimeter(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::ViewOwn);

        Ticket::factory()->create([
            'title' => 'Mine',
            'requester_id' => $requester->getKey(),
            'status' => TicketStatus::Resolved,
            'resolved_at' => now(),
        ]);
        Ticket::factory()->create([
            'title' => 'Somebody else',
            'status' => TicketStatus::Resolved,
            'resolved_at' => now(),
        ]);

        $csv = $this->actingAs($requester, 'sanctum')
            ->get(route('tickets.export'))
            ->assertSuccessful()
            ->streamedContent();

        $this->assertStringContainsString('Mine', $csv);
        $this->assertStringNotContainsString('Somebody else', $csv);
    }
}
