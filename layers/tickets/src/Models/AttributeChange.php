<?php

namespace Layers\Tickets\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Layers\Tickets\Database\Factories\AttributeChangeFactory;
use Layers\Tickets\Exceptions\AttributeChangeIsImmutableException;

final class AttributeChange extends Model
{
    /** @use HasFactory<AttributeChangeFactory> */
    use HasFactory;

    use Prunable;

    public const RETENTION_DAYS = 365;

    protected $fillable = [
        'recordable_type',
        'recordable_id',
        'author_id',
        'attribute',
        'old_value',
        'new_value',
    ];

    protected static function booted(): void
    {
        self::updating(fn (): never => throw new AttributeChangeIsImmutableException);
    }

    /**
     * @return MorphTo<Model, $this>
     */
    public function recordable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo<User, $this>
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * @return Builder<static>
     */
    public function prunable(): Builder
    {
        return self::query()->where('created_at', '<=', now()->subDays(self::RETENTION_DAYS));
    }

    protected static function newFactory(): AttributeChangeFactory
    {
        return AttributeChangeFactory::new();
    }
}
