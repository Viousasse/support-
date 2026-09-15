<div class="space-y-6">
    <h1 class="text-2xl font-semibold">{{ __('tickets.import.heading') }}</h1>

    @if (session('status'))
        <p class="rounded bg-green-100 px-4 py-2 text-green-800">{{ session('status') }}</p>
    @endif

    <form wire:submit="import" class="flex items-end gap-3">
        <div class="flex flex-col">
            <label for="csv" class="text-sm font-medium">{{ __('tickets.import.file') }}</label>
            <input id="csv" type="file" wire:model="csv" class="rounded border-gray-300">
            @error('csv')
                <span class="text-sm text-red-700">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="rounded bg-gray-900 px-4 py-2 text-white">
            {{ __('tickets.import.submit') }}
        </button>
    </form>

    @if ($import !== null)
        <section class="space-y-2" wire:poll.3s>
            @if ($import->completed_at === null)
                <p class="text-gray-600">{{ __('tickets.import.pending') }}</p>
            @else
                <p>{{ __('tickets.import.rows_read') }} : {{ $import->rows_read }}</p>
                <p>{{ __('tickets.import.rows_created') }} : {{ $import->rows_created }}</p>

                <h2 class="font-semibold">{{ __('tickets.import.rejections') }} ({{ count($import->rejections) }})</h2>
                <ul class="list-inside list-disc text-sm">
                    @foreach ($import->rejections as $rejection)
                        <li wire:key="rejection-{{ $rejection['line'] }}">
                            {{ __('tickets.import.line', ['line' => $rejection['line'], 'reason' => $rejection['reason']]) }}
                        </li>
                    @endforeach
                </ul>
            @endif
        </section>
    @endif
</div>
