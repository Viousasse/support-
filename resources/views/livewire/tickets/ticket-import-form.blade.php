<div class="space-y-6">
    <header>
        <p class="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">{{ __('layout.nav.tickets') }}</p>
        <h1 class="font-serif text-3xl font-bold">{{ __('tickets.import.heading') }}</h1>
    </header>

    @if (session('status'))
        <x-alert>{{ session('status') }}</x-alert>
    @endif

    <x-card>
        <form wire:submit="import" class="flex flex-wrap items-end gap-4">
            <x-field :label="__('tickets.import.file')" for="csv">
                <input id="csv" type="file" wire:model="csv"
                       class="text-sm file:mr-3 file:rounded-md file:border-0 file:bg-sand-200 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-ink-700">
            </x-field>

            <x-button type="submit">{{ __('tickets.import.submit') }}</x-button>
        </form>
    </x-card>

    @if ($import !== null)
        <x-card class="space-y-4" wire:poll.3s>
            @if ($import->completed_at === null)
                <p class="text-ink-500">{{ __('tickets.import.pending') }}</p>
            @else
                <dl class="grid gap-4 sm:grid-cols-3">
                    <div class="rounded-md bg-sand-100 px-4 py-3">
                        <dt class="text-xs tracking-wider text-ink-500 uppercase">{{ __('tickets.import.rows_read') }}</dt>
                        <dd class="font-serif text-2xl font-bold tabular-nums">{{ $import->rows_read }}</dd>
                    </div>
                    <div class="rounded-md bg-leaf-50 px-4 py-3">
                        <dt class="text-xs tracking-wider text-leaf-700 uppercase">{{ __('tickets.import.rows_created') }}</dt>
                        <dd class="font-serif text-2xl font-bold text-leaf-700 tabular-nums">{{ $import->rows_created }}</dd>
                    </div>
                    <div class="rounded-md bg-brand-50 px-4 py-3">
                        <dt class="text-xs tracking-wider text-brand-800 uppercase">{{ __('tickets.import.rejections') }}</dt>
                        <dd class="font-serif text-2xl font-bold text-brand-800 tabular-nums">{{ count($import->rejections) }}</dd>
                    </div>
                </dl>

                @if ($import->rejections !== [])
                    <ul class="space-y-1 text-sm text-ink-700">
                        @foreach ($import->rejections as $rejection)
                            <li wire:key="rejection-{{ $rejection['line'] }}">
                                {{ __('tickets.import.line', ['line' => $rejection['line'], 'reason' => $rejection['reason']]) }}
                            </li>
                        @endforeach
                    </ul>
                @endif
            @endif
        </x-card>
    @endif
</div>
