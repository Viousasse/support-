<?php

namespace Layers\Tickets\Actions;

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Ticket;

final class AttachFileToTicket
{
    public const DISK = 'local';

    public function execute(Ticket $ticket, UploadedFile $file, User $uploader): Attachment
    {
        $path = $file->store('tickets/'.$ticket->getKey(), self::DISK);

        return $ticket->attachments()->create([
            'uploaded_by_id' => $uploader->getKey(),
            'disk' => self::DISK,
            'path' => $path,
            'name' => $file->getClientOriginalName(),
            'mime_type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);
    }
}
