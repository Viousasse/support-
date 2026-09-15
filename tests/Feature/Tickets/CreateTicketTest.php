<?php

namespace Tests\Feature\Tickets;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class CreateTicketTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_a_ticket_through_the_api(): void
    {
        $requester = $this->userWithPermissions(TicketPermission::Create, TicketPermission::ViewOwn);
        $title = faker()->sentences(sentences: 1);

        $this->actingAs($requester, 'sanctum')
            ->postJson(route('tickets.mutate'), [
                'mutate' => [
                    [
                        'operation' => 'create',
                        'attributes' => [
                            'title' => $title,
                            'description' => faker()->paragraphs(paragraphs: 1),
                            'priority' => TicketPriority::High->value,
                        ],
                    ],
                ],
            ])
            ->assertSuccessful();

        $this->assertDatabaseHas('tickets', [
            'title' => $title,
            'priority' => TicketPriority::High->value,
            'status' => TicketStatus::Open->value,
            'requester_id' => $requester->getKey(),
        ]);
    }

    #[Test]
    public function it_refuses_a_creation_without_the_create_permission(): void
    {
        $user = $this->userWithPermissions(TicketPermission::ViewOwn);

        $this->actingAs($user, 'sanctum')
            ->postJson(route('tickets.mutate'), [
                'mutate' => [
                    [
                        'operation' => 'create',
                        'attributes' => [
                            'title' => faker()->sentences(sentences: 1),
                            'description' => faker()->paragraphs(paragraphs: 1),
                            'priority' => TicketPriority::Low->value,
                        ],
                    ],
                ],
            ])
            ->assertForbidden();

        $this->assertSame(0, Ticket::query()->count());
    }
}
