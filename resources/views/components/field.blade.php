@props(['label', 'for'])

<div class="flex flex-col gap-1.5">
    <label for="{{ $for }}" class="text-sm font-medium text-ink-700">{{ $label }}</label>
    {{ $slot }}
    @error($for)
        <span class="text-sm text-brand-800">{{ $message }}</span>
    @enderror
</div>
