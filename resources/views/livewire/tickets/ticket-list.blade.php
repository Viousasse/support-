<div class="space-y-6">
    <h1 class="text-2xl font-semibold">{{ __('tickets.list.heading') }}</h1>

    @if (session('status'))
        <p class="rounded bg-green-100 px-4 py-2 text-green-800">{{ session('status') }}</p>
    @endif

    <div class="flex flex-wrap gap-4">
        <div class="flex flex-col">
            <label for="filter-status" class="text-sm font-medium">{{ __('tickets.list.filter_status') }}</label>
            <select id="filter-status" wire:model.live="status" class="rounded border-gray-300">
                <option value="">{{ __('tickets.list.all_statuses') }}</option>
                @foreach ($statuses as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </select>
        </div>

        <div class="flex flex-col">
            <label for="filter-priority" class="text-sm font-medium">{{ __('tickets.list.filter_priority') }}</label>
            <select id="filter-priority" wire:model.live="priority" class="rounded border-gray-300">
                <option value="">{{ __('tickets.list.all_priorities') }}</option>
                @foreach ($priorities as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </select>
        </div>
    </div>

    <table class="w-full border-collapse text-left text-sm">
        <thead class="border-b border-gray-300">
            <tr>
                @foreach ($sortableColumns as $column)
                    <th scope="col" class="px-3 py-2">
                        <button
                            type="button"
                            wire:click="sortBy('{{ $column }}')"
                            aria-label="{{ __('tickets.list.sort_by', ['column' => __('tickets.list.columns.'.$column)]) }}"
                            class="font-semibold underline-offset-2 hover:underline"
                        >
                            {{ __('tickets.list.columns.'.$column) }}
                        </button>
                    </th>
                @endforeach
                <th scope="col" class="px-3 py-2">{{ __('tickets.list.columns.requester') }}</th>
                <th scope="col" class="px-3 py-2">{{ __('tickets.list.columns.assigned_technician') }}</th>
                <th scope="col" class="px-3 py-2">{{ __('tickets.list.columns.comments_count') }}</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($tickets as $ticket)
                <tr wire:key="ticket-{{ $ticket->id }}" class="border-b border-gray-200">
                    <td class="px-3 py-2">{{ $ticket->title }}</td>
                    <td class="px-3 py-2">{{ __($ticket->status->translationKey()) }}</td>
                    <td class="px-3 py-2">{{ __($ticket->priority->translationKey()) }}</td>
                    <td class="px-3 py-2">{{ $ticket->created_at->isoFormat('LL') }}</td>
                    <td class="px-3 py-2">{{ $ticket->requester->name }}</td>
                    <td class="px-3 py-2">
                        {{ $ticket->assignedTechnician?->name ?? __('tickets.list.unassigned') }}
                    </td>
                    <td class="px-3 py-2">{{ $ticket->comments_count }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" class="px-3 py-6 text-center text-gray-500">
                        {{ __('tickets.list.empty') }}
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{ $tickets->links() }}
</div>
