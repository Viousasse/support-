@props(['tone' => 'success'])

<p {{ $attributes->class([
    'rounded-field px-4 py-3 text-sm',
    'bg-tone-green-bg text-tone-green-fg' => $tone === 'success',
    'bg-tone-red-bg text-tone-red-fg' => $tone === 'error',
]) }}>{{ $slot }}</p>
