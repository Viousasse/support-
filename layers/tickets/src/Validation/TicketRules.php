<?php

namespace Layers\Tickets\Validation;

use Illuminate\Validation\Rule;
use Layers\Tickets\Enums\TicketPriority;

final class TicketRules
{
    public const TITLE_MAX = 255;

    /**
     * The single source of truth for what opening a ticket requires: the form,
     * the MCP tool and the MCP resource all read it here.
     *
     * @return array<string, array<int, mixed>>
     */
    public static function forCreation(): array
    {
        return [
            'title' => ['required', 'string', 'max:'.self::TITLE_MAX],
            'description' => ['required', 'string'],
            'priority' => ['required', Rule::enum(TicketPriority::class)],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function messages(): array
    {
        return [
            'title.required' => __('tickets.validation.title_required'),
            'title.max' => __('tickets.validation.title_max'),
            'description.required' => __('tickets.validation.description_required'),
            'priority.required' => __('tickets.validation.priority_required'),
            'priority.enum' => __('tickets.validation.priority_enum'),
        ];
    }
}
