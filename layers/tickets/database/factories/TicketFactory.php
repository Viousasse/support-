<?php

namespace Layers\Tickets\Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Ticket;

/**
 * @extends Factory<Ticket>
 */
final class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'requester_id' => User::factory(),
            'assigned_technician_id' => null,
            'title' => faker()->sentences(sentences: 1),
            'description' => faker()->paragraphs(paragraphs: 2),
            'status' => TicketStatus::Open,
            'priority' => TicketPriority::Normal,
            'resolved_at' => null,
            'sla_met' => null,
        ];
    }

    public function assigned(): static
    {
        return $this->state(fn (): array => [
            'assigned_technician_id' => User::factory(),
            'status' => TicketStatus::Assigned,
        ]);
    }

    public function withStatus(TicketStatus $status): static
    {
        return $this->state(fn (): array => [
            'status' => $status,
            'resolved_at' => in_array($status, [TicketStatus::Resolved, TicketStatus::Closed], true)
                ? now()
                : null,
        ]);
    }

    public function withPriority(TicketPriority $priority): static
    {
        return $this->state(fn (): array => ['priority' => $priority]);
    }
}
