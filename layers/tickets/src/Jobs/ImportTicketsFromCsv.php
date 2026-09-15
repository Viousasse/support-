<?php

namespace Layers\Tickets\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Pipeline\Pipeline;
use Layers\Tickets\Imports\Stages\CreateTickets;
use Layers\Tickets\Imports\Stages\NormalizeRows;
use Layers\Tickets\Imports\Stages\ReadCsvRows;
use Layers\Tickets\Imports\Stages\ResolveRequesters;
use Layers\Tickets\Imports\Stages\ValidateRows;
use Layers\Tickets\Imports\TicketImportPayload;
use Layers\Tickets\Models\TicketImport;

final class ImportTicketsFromCsv implements ShouldQueue
{
    use Queueable;

    public const STAGES = [
        ReadCsvRows::class,
        NormalizeRows::class,
        ValidateRows::class,
        ResolveRequesters::class,
        CreateTickets::class,
    ];

    public function __construct(private readonly int $importId) {}

    public function handle(Pipeline $pipeline): void
    {
        $import = TicketImport::query()->findOrFail($this->importId);

        $payload = $pipeline
            ->send(new TicketImportPayload($import->disk, $import->path))
            ->through(self::STAGES)
            ->thenReturn();

        $import->update([
            'rows_read' => $payload->read(),
            'rows_created' => $payload->created,
            'rejections' => $payload->sortedRejections(),
            'completed_at' => now(),
        ]);
    }
}
