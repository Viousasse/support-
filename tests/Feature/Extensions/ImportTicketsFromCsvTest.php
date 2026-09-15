<?php

namespace Tests\Feature\Extensions;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Exceptions\TicketImportFileIsUnreadableException;
use Layers\Tickets\Jobs\ImportTicketsFromCsv;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Models\TicketImport;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class ImportTicketsFromCsvTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_every_ticket_of_a_clean_file(): void
    {
        $requester = User::factory()->create(['email' => 'alice@example.test']);
        $import = $this->importOf([
            'Printer is jammed,The third floor printer jams,high,alice@example.test',
            'VPN is down,No remote access since this morning,critical,ALICE@example.test',
        ]);

        (new ImportTicketsFromCsv($import->getKey()))->handle(app('Illuminate\Pipeline\Pipeline'));

        $import->refresh();

        $this->assertSame(2, $import->rows_read);
        $this->assertSame(2, $import->rows_created);
        $this->assertSame([], $import->rejections);
        $this->assertSame(2, Ticket::query()->where('requester_id', $requester->getKey())->count());
        $this->assertSame(TicketStatus::Open, Ticket::query()->first()->status);
        $this->assertNotNull($import->completed_at);
    }

    #[Test]
    public function it_creates_the_valid_rows_and_reports_the_rejected_ones_with_their_line(): void
    {
        User::factory()->create(['email' => 'alice@example.test']);
        $import = $this->importOf([
            'Valid one,A real description,low,alice@example.test',
            ',Missing title,low,alice@example.test',
            'Unknown priority,A real description,urgent,alice@example.test',
            'Unknown requester,A real description,low,ghost@example.test',
            'Missing description,,low,alice@example.test',
            'Bad email,A real description,low,not-an-email',
            'Valid two,A real description,critical,alice@example.test',
        ]);

        (new ImportTicketsFromCsv($import->getKey()))->handle(app('Illuminate\Pipeline\Pipeline'));

        $import->refresh();

        $this->assertSame(7, $import->rows_read);
        $this->assertSame(2, $import->rows_created);
        $this->assertCount(5, $import->rejections);
        $this->assertSame([3, 4, 5, 6, 7], array_column($import->rejections, 'line'));
        $this->assertSame(2, Ticket::query()->count());
    }

    #[Test]
    public function it_stops_on_a_technical_error_instead_of_reporting_a_quiet_success(): void
    {
        $import = TicketImport::factory()->create(['path' => 'imports/does-not-exist.csv']);
        Storage::fake('local');

        $this->expectException(TicketImportFileIsUnreadableException::class);

        (new ImportTicketsFromCsv($import->getKey()))->handle(app('Illuminate\Pipeline\Pipeline'));
    }

    #[Test]
    public function it_leaves_the_import_unfinished_when_a_technical_error_interrupts_it(): void
    {
        $import = TicketImport::factory()->create(['path' => 'imports/does-not-exist.csv']);
        Storage::fake('local');

        try {
            (new ImportTicketsFromCsv($import->getKey()))->handle(app('Illuminate\Pipeline\Pipeline'));
        } catch (TicketImportFileIsUnreadableException) {
            // The job fails on purpose: the report must not claim a clean run.
        }

        $this->assertNull($import->fresh()->completed_at);
        $this->assertSame(0, Ticket::query()->count());
    }

    #[Test]
    public function it_does_not_verify_one_row_with_one_query(): void
    {
        User::factory()->create(['email' => 'alice@example.test']);

        $queriesForFive = $this->countQueriesWhileImporting(5);
        $queriesForTwoHundred = $this->countQueriesWhileImporting(200);

        $this->assertSame($queriesForFive, $queriesForTwoHundred);
    }

    /**
     * @param  array<int, string>  $rows
     */
    private function importOf(array $rows): TicketImport
    {
        Storage::fake('local');

        $path = 'imports/tickets.csv';
        Storage::disk('local')->put(
            $path,
            "title,description,priority,requester_email\n".implode("\n", $rows),
        );

        return TicketImport::factory()->create(['disk' => 'local', 'path' => $path]);
    }

    private function countQueriesWhileImporting(int $rows): int
    {
        Ticket::query()->forceDelete();

        $import = $this->importOf(array_map(
            static fn (int $number): string => "Ticket {$number},A description,".TicketPriority::Low->value.',alice@example.test',
            range(1, $rows),
        ));

        DB::connection()->enableQueryLog();
        DB::connection()->flushQueryLog();

        (new ImportTicketsFromCsv($import->getKey()))->handle(app('Illuminate\Pipeline\Pipeline'));

        return count(DB::connection()->getQueryLog());
    }
}
