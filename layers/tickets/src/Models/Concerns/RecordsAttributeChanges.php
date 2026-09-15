<?php

namespace Layers\Tickets\Models\Concerns;

use BackedEnum;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Layers\Tickets\Models\AttributeChange;

trait RecordsAttributeChanges
{
    public static function bootRecordsAttributeChanges(): void
    {
        static::updated(function (self $recorded): void {
            foreach ($recorded->recordedAttributes() as $attribute) {
                if (! array_key_exists($attribute, $recorded->getChanges())) {
                    continue;
                }

                $recorded->attributeChanges()->create([
                    'author_id' => auth()->id(),
                    'attribute' => $attribute,
                    'old_value' => self::readable($recorded->getOriginal($attribute)),
                    'new_value' => self::readable($recorded->getAttribute($attribute)),
                ]);
            }
        });
    }

    /**
     * @return MorphMany<AttributeChange, $this>
     */
    public function attributeChanges(): MorphMany
    {
        return $this->morphMany(AttributeChange::class, 'recordable');
    }

    /**
     * @return array<int, string>
     */
    abstract public function recordedAttributes(): array;

    private static function readable(mixed $recorded): ?string
    {
        if ($recorded instanceof BackedEnum) {
            return (string) $recorded->value;
        }

        return $recorded === null ? null : (string) $recorded;
    }
}
