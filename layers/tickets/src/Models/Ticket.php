<?php

namespace Layers\Tickets\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Layers\Tickets\Database\Factories\TicketFactory;
use Layers\Tickets\Enums\TicketPriority;
use Layers\Tickets\Enums\TicketStatus;
use Layers\Tickets\Models\Concerns\RecordsAttributeChanges;
use Lomkit\Access\Controls\HasControl;

final class Ticket extends Model
{
    use HasControl;

    /** @use HasFactory<TicketFactory> */
    use HasFactory;

    use Prunable;
    use RecordsAttributeChanges;
    use SoftDeletes;

    public const RETENTION_DAYS = 30;

    protected $fillable = [
        'requester_id',
        'assigned_technician_id',
        'title',
        'description',
        'status',
        'priority',
        'resolved_at',
        'escalated_at',
        'sla_met',
    ];

    protected function casts(): array
    {
        return [
            'status' => TicketStatus::class,
            'priority' => TicketPriority::class,
            'resolved_at' => 'datetime',
            'escalated_at' => 'datetime',
            'sla_met' => 'boolean',
        ];
    }

    /**
     * @return array<int, string>
     */
    public function recordedAttributes(): array
    {
        return ['status', 'priority', 'assigned_technician_id'];
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function requester(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function assignedTechnician(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_technician_id');
    }

    /**
     * @return HasMany<Comment, $this>
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * @return HasMany<Attachment, $this>
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class);
    }

    public function pruning(): void
    {
        $this->attachments()->delete();
        $this->comments()->delete();
        $this->attributeChanges()->delete();
    }

    /**
     * @return Builder<static>
     */
    public function prunable(): Builder
    {
        return self::onlyTrashed()
            ->where('deleted_at', '<=', now()->subDays(self::RETENTION_DAYS));
    }

    protected static function newFactory(): TicketFactory
    {
        return TicketFactory::new();
    }
}
