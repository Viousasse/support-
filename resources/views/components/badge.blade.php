@props(['tone' => 'neutral'])

<span {{ $attributes->class([
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
    'bg-sand-200 text-ink-700' => $tone === 'neutral',
    'bg-brand-50 text-brand-800' => $tone === 'info',
    'bg-leaf-50 text-leaf-700' => $tone === 'success',
    'bg-sand-100 text-ink-500' => $tone === 'muted',
    'bg-brand-200 text-brand-800' => $tone === 'accent',
    'bg-brand-600 text-sand-50' => $tone === 'danger',
]) }}>{{ $slot }}</span>
