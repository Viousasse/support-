@props(['tone' => 'neutral'])

<span {{ $attributes->class([
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
    'bg-tone-grey-bg text-tone-grey-fg' => $tone === 'neutral' || $tone === 'muted',
    'bg-tone-cyan-bg text-tone-blue-fg' => $tone === 'info',
    'bg-tone-orange-bg text-tone-orange-fg' => $tone === 'progress',
    'bg-tone-green-bg text-tone-green-fg' => $tone === 'success',
    'bg-tone-red-bg text-tone-red-fg' => $tone === 'danger',
]) }}>{{ $slot }}</span>
