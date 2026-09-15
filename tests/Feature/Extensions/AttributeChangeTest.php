<?php

namespace Tests\Feature\Extensions;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Layers\Tickets\Actions\AssignTicket;
use Layers\Tickets\Enums\TicketPermission;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Exceptions\AttributeChangeIsImmutableException;
use Layers\Tickets\Models\AttributeChange;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class AttributeChangeTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_records_the_old_and_the_new_value_of_a_tracked_attribute(): void
    {
        $ticket = Ticket::factory()->create(['status' => TicketStatus::Open]);

        $ticket->update(['status' => TicketStatus::Assigned]);

        $change = AttributeChange::query()->sole();

        $this->assertSame('status', $change->attribute);
        $this->assertSame(TicketStatus::Open->value, $change->old_value);
        $this->assertSame(TicketStatus::Assigned->value, $change->new_value);
        $this->assertSame($ticket->getKey(), $change->recordable_id);
        $this->assertSame(Ticket::class, $change->recordable_type);
    }

    #[Test]
    public function it_records_nothing_for_an_attribute_that_is_not_tracked(): void
    {
        $ticket = Ticket::factory()->create();

        $ticket->update(['title' => 'A brand new title']);

        $this->assertSame(0, AttributeChange::query()->count());
    }

    #[Test]
    public function it_records_the_author_of_the_change(): void
    {
        $manager = $this->userWithPermissions(TicketPermission::ViewAny, TicketPermission::Assign);
        $technician = $this->userWithPermissions(TicketPermission::ViewAssigned);
        $ticket = Ticket::factory()->create();

        $this->actingAs($manager);
        app(AssignTicket::class)->execute($ticket, $technician);

        $this->assertSame(
            $manager->getKey(),
            AttributeChange::query()->where('attribute', 'status')->sole()->author_id,
        );
    }

    #[Test]
    public function it_records_a_change_made_without_an_authenticated_user(): void
    {
        $ticket = Ticket::factory()->create(['priority' => TicketPriority::Low]);

        $ticket->update(['priority' => TicketPriority::High]);

        $change = AttributeChange::query()->sole();

        $this->assertNull($change->author_id);
        $this->assertSame(TicketPriority::High->value, $change->new_value);
    }

    #[Test]
    public function it_works_on_a_second_model_without_a_single_specific_line(): void
    {
        $comment = Comment::factory()->create(['body' => 'Before']);

        $comment->update(['body' => 'After']);

        $change = AttributeChange::query()->sole();

        $this->assertSame(Comment::class, $change->recordable_type);
        $this->assertSame('Before', $change->old_value);
        $this->assertSame('After', $change->new_value);
    }

    #[Test]
    public function it_exposes_the_journal_through_the_recorded_model(): void
    {
        $ticket = Ticket::factory()->create();

        $ticket->update(['status' => TicketStatus::Assigned]);
        $ticket->update(['priority' => TicketPriority::Critical]);

        $this->assertCount(2, $ticket->attributeChanges()->get());
    }

    #[Test]
    public function it_refuses_to_alter_a_journal_entry(): void
    {
        $change = AttributeChange::factory()->create();

        $this->expectException(AttributeChangeIsImmutableException::class);

        $change->update(['new_value' => 'tampered']);
    }

    #[Test]
    public function it_prunes_the_journal_past_the_retention_period(): void
    {
        $recent = AttributeChange::factory()->create();
        $old = AttributeChange::factory()->create();

        AttributeChange::query()
            ->whereKey($old->getKey())
            ->update(['created_at' => now()->subDays(AttributeChange::RETENTION_DAYS + 1)]);

        $this->artisan('model:prune', ['--model' => [AttributeChange::class]])->assertSuccessful();

        $this->assertSame([$recent->getKey()], AttributeChange::query()->pluck('id')->all());
    }
}
