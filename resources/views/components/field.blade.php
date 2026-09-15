@props(['label', 'for'])

<div class="flex flex-col gap-1.5">
    <label for="{{ $for }}" class="font-medium text-grey-800">{{ $label }}</label>
    {{ $slot }}
    @error($for)
        <span class="text-xs text-red-500">{{ $message }}</span>
    @enderror
</div>
