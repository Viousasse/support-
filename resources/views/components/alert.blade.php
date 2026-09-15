@props(['tone' => 'success'])

<p {{ $attributes->class([
    'rounded-md border px-4 py-3 text-sm',
    'border-leaf-700/20 bg-leaf-50 text-leaf-700' => $tone === 'success',
    'border-brand-800/20 bg-brand-50 text-brand-800' => $tone === 'error',
]) }}>{{ $slot }}</p>
