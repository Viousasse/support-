<?php

namespace Tests\Feature\Extensions;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Imports\Stages\CreateTickets;
use Layers\Tickets\Imports\Stages\NormalizeRows;
use Layers\Tickets\Imports\Stages\ReadCsvRows;
use Layers\Tickets\Imports\Stages\ResolveRequesters;
use Layers\Tickets\Imports\Stages\ValidateRows;
use Layers\Tickets\Imports\TicketImportPayload;
use Layers\Tickets\Models\Ticket;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class TicketImportStagesTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function read_csv_rows_numbers_the_lines_from_the_file(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('imports/a.csv', "title,description,priority,requester_email\nA,B,low,a@b.test\n\nC,D,high,c@d.test");

        $payload = $this->through(new ReadCsvRows, new TicketImportPayload('local', 'imports/a.csv'));

        $this->assertSame([2, 4], array_column($payload->rows, 'line'));
        $this->assertSame('A', $payload->rows[0]['title']);
    }

    #[Test]
    public function normalize_rows_trims_and_lowercases_what_must_be_compared(): void
    {
        $payload = new TicketImportPayload('local', 'imports/a.csv');
        $payload->rows = [[
            'line' => 2,
            'title' => '  Spaced  ',
            'description' => ' Text ',
            'priority' => ' HIGH ',
            'requester_email' => '  Alice@Example.TEST ',
        ]];

        $payload = $this->through(new NormalizeRows, $payload);

        $this->assertSame('Spaced', $payload->rows[0]['title']);
        $this->assertSame(TicketPriority::High->value, $payload->rows[0]['priority']);
        $this->assertSame('alice@example.test', $payload->rows[0]['requester_email']);
    }

    #[Test]
    public function validate_rows_rejects_the_invalid_ones_and_keeps_the_others(): void
    {
        $payload = new TicketImportPayload('local', 'imports/a.csv');
        $payload->rows = [
            ['line' => 2, 'title' => 'Good', 'description' => 'Text', 'priority' => 'low', 'requester_email' => 'a@b.test'],
            ['line' => 3, 'title' => '', 'description' => 'Text', 'priority' => 'low', 'requester_email' => 'a@b.test'],
        ];

        $payload = $this->through(new ValidateRows, $payload);

        $this->assertCount(1, $payload->rows);
        $this->assertSame(3, $payload->rejections[0]['line']);
    }

    #[Test]
    public function resolve_requesters_reads_every_email_in_a_single_query(): void
    {
        $alice = User::factory()->create(['email' => 'alice@example.test']);

        $payload = new TicketImportPayload('local', 'imports/a.csv');
        $payload->rows = [
            ['line' => 2, 'title' => 'A', 'description' => 'B', 'priority' => 'low', 'requester_email' => 'alice@example.test'],
            ['line' => 3, 'title' => 'C', 'description' => 'D', 'priority' => 'low', 'requester_email' => 'ghost@example.test'],
        ];

        $payload = $this->through(new ResolveRequesters, $payload);

        $this->assertSame([$alice->getKey()], array_values($payload->requesterIdsByEmail));
        $this->assertCount(1, $payload->rows);
        $this->assertSame(3, $payload->rejections[0]['line']);
    }

    #[Test]
    public function create_tickets_inserts_the_accepted_rows(): void
    {
        $alice = User::factory()->create(['email' => 'alice@example.test']);

        $payload = new TicketImportPayload('local', 'imports/a.csv');
        $payload->requesterIdsByEmail = ['alice@example.test' => $alice->getKey()];
        $payload->rows = [
            ['line' => 2, 'title' => 'A', 'description' => 'B', 'priority' => 'low', 'requester_email' => 'alice@example.test'],
        ];

        $payload = $this->through(new CreateTickets, $payload);

        $this->assertSame(1, $payload->created);
        $this->assertSame('A', Ticket::query()->sole()->title);
    }

    #[Test]
    public function create_tickets_does_nothing_when_every_row_was_rejected(): void
    {
        $payload = $this->through(new CreateTickets, new TicketImportPayload('local', 'imports/a.csv'));

        $this->assertSame(0, $payload->created);
        $this->assertSame(0, Ticket::query()->count());
    }

    private function through(object $stage, TicketImportPayload $payload): TicketImportPayload
    {
        return $stage->handle($payload, static fn (TicketImportPayload $carried): TicketImportPayload => $carried);
    }
}
