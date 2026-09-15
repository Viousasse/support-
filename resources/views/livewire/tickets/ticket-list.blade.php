<div class="space-y-6">
    <header class="flex flex-wrap items-end justify-between gap-4">
        <div>
            <p class="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">{{ __('layout.nav.tickets') }}</p>
            <h1 class="font-serif text-3xl font-bold">{{ __('tickets.list.heading') }}</h1>
        </div>

        <a href="{{ route('tickets.create') }}"
           class="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-sand-50 transition-colors hover:bg-brand-800">
            {{ __('layout.nav.new_ticket') }}
        </a>
    </header>

    @if (session('status'))
        <x-alert>{{ session('status') }}</x-alert>
    @endif

    <x-card class="flex flex-wrap gap-6">
        <x-field :label="__('tickets.list.filter_status')" for="filter-status">
            <select id="filter-status" wire:model.live="status"
                    class="rounded-md border border-ink-200 bg-sand-50 px-3 py-2 text-sm">
                <option value="">{{ __('tickets.list.all_statuses') }}</option>
                @foreach ($statuses as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </select>
        </x-field>

        <x-field :label="__('tickets.list.filter_priority')" for="filter-priority">
            <select id="filter-priority" wire:model.live="priority"
                    class="rounded-md border border-ink-200 bg-sand-50 px-3 py-2 text-sm">
                <option value="">{{ __('tickets.list.all_priorities') }}</option>
                @foreach ($priorities as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </select>
        </x-field>
    </x-card>

    <x-card class="overflow-x-auto p-0">
        <table class="w-full border-collapse text-left text-sm">
            <thead class="border-b border-sand-200 bg-sand-100 text-xs tracking-wider text-ink-500 uppercase">
                <tr>
                    @foreach ($sortableColumns as $column)
                        <th scope="col" class="px-4 py-3 font-semibold">
                            <button
                                type="button"
                                wire:click="sortBy('{{ $column }}')"
                                aria-label="{{ __('tickets.list.sort_by', ['column' => __('tickets.list.columns.'.$column)]) }}"
                                class="inline-flex items-center gap-1 transition-colors hover:text-brand-600"
                            >
                                {{ __('tickets.list.columns.'.$column) }}
                                @if ($sortColumn === $column)
                                    <span aria-hidden="true">{{ $sortDirection === 'asc' ? '↑' : '↓' }}</span>
                                @endif
                            </button>
                        </th>
                    @endforeach
                    <th scope="col" class="px-4 py-3 font-semibold">{{ __('tickets.list.columns.requester') }}</th>
                    <th scope="col" class="px-4 py-3 font-semibold">{{ __('tickets.list.columns.assigned_technician') }}</th>
                    <th scope="col" class="px-4 py-3 text-right font-semibold">{{ __('tickets.list.columns.comments_count') }}</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($tickets as $ticket)
                    <tr wire:key="ticket-{{ $ticket->id }}" class="border-b border-sand-200 last:border-0 hover:bg-sand-100">
                        <td class="px-4 py-3">
                            <a href="{{ route('tickets.edit', $ticket) }}"
                               class="font-medium underline-offset-4 hover:text-brand-600 hover:underline">
                                {{ $ticket->title }}
                            </a>
                        </td>
                        <td class="px-4 py-3">
                            <x-badge :tone="$ticket->status->tone()">{{ __($ticket->status->translationKey()) }}</x-badge>
                        </td>
                        <td class="px-4 py-3">
                            <x-badge :tone="$ticket->priority->tone()">{{ __($ticket->priority->translationKey()) }}</x-badge>
                        </td>
                        <td class="px-4 py-3 text-ink-500">{{ $ticket->created_at->isoFormat('LL') }}</td>
                        <td class="px-4 py-3">{{ $ticket->requester->name }}</td>
                        <td class="px-4 py-3 text-ink-500">
                            {{ $ticket->assignedTechnician?->name ?? __('tickets.list.unassigned') }}
                        </td>
                        <td class="px-4 py-3 text-right tabular-nums">{{ $ticket->comments_count }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="px-4 py-12 text-center text-ink-500">
                            {{ __('tickets.list.empty') }}
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </x-card>

    {{ $tickets->links() }}
</div>
