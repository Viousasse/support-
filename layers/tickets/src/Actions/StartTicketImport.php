<?php

namespace Layers\Tickets\Actions;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Layers\Tickets\Jobs\ImportTicketsFromCsv;
use Layers\Tickets\Models\TicketImport;

final class StartTicketImport
{
    public const DISK = 'local';

    public function execute(UploadedFile $file, User $uploader): TicketImport
    {
        $import = TicketImport::create([
            'uploaded_by_id' => $uploader->getKey(),
            'disk' => self::DISK,
            'path' => $file->store('imports', self::DISK),
        ]);

        ImportTicketsFromCsv::dispatch($import->getKey())->afterCommit();

        return $import;
    }
}
