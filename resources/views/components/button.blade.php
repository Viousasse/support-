@props(['variant' => 'primary'])

<button {{ $attributes->class([
    'inline-flex items-center justify-center rounded-field px-4 py-2 font-semibold transition-colors',
    'bg-red-500 text-white hover:bg-red-600' => $variant === 'primary',
    'border border-grey-100 bg-white text-grey-800 hover:border-grey-300' => $variant === 'secondary',
]) }}>{{ $slot }}</button>
