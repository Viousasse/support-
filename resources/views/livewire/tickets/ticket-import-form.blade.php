<div class="space-y-6">
    <header>
        <p class="text-xs font-semibold tracking-[0.18em] text-grey-500 uppercase">{{ __('layout.nav.tickets') }}</p>
        <h1 class="mt-1 text-[2rem] leading-tight font-bold text-grey-900">{{ __('tickets.import.heading') }}</h1>
    </header>

    @if (session('status'))
        <x-alert>{{ session('status') }}</x-alert>
    @endif

    <x-card>
        <form wire:submit="import" class="flex flex-wrap items-end gap-4">
            <x-field :label="__('tickets.import.file')" for="csv">
                <input id="csv" type="file" wire:model="csv"
                       class="text-sm file:mr-3 file:rounded-field file:border-0 file:bg-grey-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-grey-800">
            </x-field>

            <x-button type="submit">{{ __('tickets.import.submit') }}</x-button>
        </form>
    </x-card>

    @if ($import !== null)
        <x-card class="space-y-4" wire:poll.3s>
            @if ($import->completed_at === null)
                <p class="text-grey-500">{{ __('tickets.import.pending') }}</p>
            @else
                <dl class="grid gap-4 sm:grid-cols-3">
                    <div class="rounded-field bg-grey-50 px-4 py-3">
                        <dt class="text-xs font-semibold tracking-wider text-grey-500 uppercase">{{ __('tickets.import.rows_read') }}</dt>
                        <dd class="text-2xl font-bold text-grey-900 tabular-nums">{{ $import->rows_read }}</dd>
                    </div>
                    <div class="rounded-field bg-tone-green-bg px-4 py-3">
                        <dt class="text-xs font-semibold tracking-wider text-tone-green-fg uppercase">{{ __('tickets.import.rows_created') }}</dt>
                        <dd class="text-2xl font-bold text-tone-green-fg tabular-nums">{{ $import->rows_created }}</dd>
                    </div>
                    <div class="rounded-field bg-tone-red-bg px-4 py-3">
                        <dt class="text-xs font-semibold tracking-wider text-tone-red-fg uppercase">{{ __('tickets.import.rejections') }}</dt>
                        <dd class="text-2xl font-bold text-tone-red-fg tabular-nums">{{ count($import->rejections) }}</dd>
                    </div>
                </dl>

                @if ($import->rejections !== [])
                    <ul class="space-y-1 text-sm text-grey-800">
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
