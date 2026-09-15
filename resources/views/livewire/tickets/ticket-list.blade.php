<div class="space-y-6">
    <header class="flex flex-wrap items-end justify-between gap-4">
        <div>
            <p class="text-xs font-semibold tracking-[0.18em] text-grey-500 uppercase">{{ __('layout.nav.tickets') }}</p>
            <h1 class="mt-1 text-[2rem] leading-tight font-bold text-grey-900">{{ __('tickets.list.heading') }}</h1>
        </div>

        <a href="{{ route('tickets.create') }}"
           class="inline-flex items-center rounded-field bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600">
            {{ __('layout.nav.new_ticket') }}
        </a>
    </header>

    @if (session('status'))
        <x-alert>{{ session('status') }}</x-alert>
    @endif

    <x-card class="flex flex-wrap gap-6">
        <x-field :label="__('tickets.list.filter_status')" for="filter-status">
            <x-select id="filter-status" wire:model.live="status">
                <option value="">{{ __('tickets.list.all_statuses') }}</option>
                @foreach ($statuses as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </x-select>
        </x-field>

        <x-field :label="__('tickets.list.filter_priority')" for="filter-priority">
            <x-select id="filter-priority" wire:model.live="priority">
                <option value="">{{ __('tickets.list.all_priorities') }}</option>
                @foreach ($priorities as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </x-select>
        </x-field>
    </x-card>

    <x-card class="overflow-x-auto p-0">
        <table class="w-full border-collapse text-left">
            <thead class="border-b border-grey-50 text-xs font-semibold tracking-wider text-grey-500 uppercase">
                <tr>
                    @foreach ($sortableColumns as $column)
                        <th
                            scope="col"
                            class="px-4 py-3"
                            aria-sort="{{ $sortColumn === $column ? ($sortDirection === 'asc' ? 'ascending' : 'descending') : 'none' }}"
                        >
                            <button
                                type="button"
                                wire:click="sortBy('{{ $column }}')"
                                aria-label="{{ __('tickets.list.sort_by', ['column' => __('tickets.list.columns.'.$column)]) }}"
                                @class([
                                    'uppercase transition-colors hover:text-grey-900',
                                    'text-red-500' => $sortColumn === $column,
                                ])
                            >{{ __('tickets.list.columns.'.$column) }}</button>
                        </th>
                    @endforeach
                    <th scope="col" class="px-4 py-3">{{ __('tickets.list.columns.requester') }}</th>
                    <th scope="col" class="px-4 py-3">{{ __('tickets.list.columns.assigned_technician') }}</th>
                    <th scope="col" class="px-4 py-3 text-right">{{ __('tickets.list.columns.comments_count') }}</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($tickets as $ticket)
                    <tr wire:key="ticket-{{ $ticket->id }}" class="border-b border-grey-50 last:border-0 hover:bg-red-50">
                        <td class="px-4 py-3">
                            <a href="{{ route('tickets.edit', $ticket) }}"
                               class="font-medium text-grey-900 underline-offset-4 hover:text-link hover:underline">
                                {{ $ticket->title }}
                            </a>
                        </td>
                        <td class="px-4 py-3">
                            <x-badge :tone="$ticket->status->tone()">{{ __($ticket->status->translationKey()) }}</x-badge>
                        </td>
                        <td class="px-4 py-3">
                            <x-badge :tone="$ticket->priority->tone()">{{ __($ticket->priority->translationKey()) }}</x-badge>
                        </td>
                        <td class="px-4 py-3 text-grey-500">{{ $ticket->created_at->format('d/m/Y') }}</td>
                        <td class="px-4 py-3">{{ $ticket->requester->name }}</td>
                        <td class="px-4 py-3 text-grey-500">
                            {{ $ticket->assignedTechnician?->name ?? __('tickets.list.unassigned') }}
                        </td>
                        <td class="px-4 py-3 text-right tabular-nums">{{ $ticket->comments_count }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="px-4 py-14 text-center text-grey-500">
                            {{ __('tickets.list.empty') }}
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </x-card>

    {{ $tickets->links() }}
</div>
