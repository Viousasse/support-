<?php

namespace Layers\Tickets\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Layers\Tickets\Database\Factories\TicketFactory;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Lomkit\Access\Controls\HasControl;

class Ticket extends Model
{
    use HasFactory;
    use SoftDeletes;
    use Prunable;
    use HasControl;
    protected $fillable = [
        'requester_id',
        'assigned_technician_id',
        'title',
        'description',
        'status',
        'priority',
        'resolved_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => TicketStatus::class,
            'priority' => TicketPriority::class,
            'resolved_at' => 'datetime',
        ];
    }

    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function assignedTechnician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_technician_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function prunable(): \Illuminate\Database\Eloquent\Builder
    {
        return static::onlyTrashed()
            ->where('deleted_at', '<=', now()->subDays(30));
    }

    protected static function newFactory(): TicketFactory
    {
        return TicketFactory::new();
    }
}