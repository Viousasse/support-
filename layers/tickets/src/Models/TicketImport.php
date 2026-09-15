<?php

namespace Layers\Tickets\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Layers\Tickets\Database\Factories\TicketImportFactory;

final class TicketImport extends Model
{
    /** @use HasFactory<TicketImportFactory> */
    use HasFactory;

    protected $fillable = [
        'uploaded_by_id',
        'disk',
        'path',
        'rows_read',
        'rows_created',
        'rejections',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'rejections' => 'array',
            'completed_at' => 'datetime',
        ];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by_id');
    }

    protected static function newFactory(): TicketImportFactory
    {
        return TicketImportFactory::new();
    }
}
