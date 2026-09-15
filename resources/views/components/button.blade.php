@props(['variant' => 'primary'])

<button {{ $attributes->class([
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors',
    'bg-brand-600 text-sand-50 hover:bg-brand-800' => $variant === 'primary',
    'border border-ink-200 bg-sand-50 text-ink-700 hover:border-brand-600 hover:text-brand-600' => $variant === 'secondary',
]) }}>{{ $slot }}</button>
