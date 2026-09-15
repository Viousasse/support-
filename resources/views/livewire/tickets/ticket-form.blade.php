<div class="space-y-6">
    <header>
        <p class="text-xs font-semibold tracking-[0.18em] text-grey-500 uppercase">{{ __('layout.nav.tickets') }}</p>
        <h1 class="mt-1 text-[2rem] leading-tight font-bold text-grey-900">
            {{ $ticket === null ? __('tickets.form.create_heading') : __('tickets.form.edit_heading') }}
        </h1>
    </header>

    @if (session('status'))
        <x-alert>{{ session('status') }}</x-alert>
    @endif

    @error('ticket')
        <x-alert tone="error">{{ $message }}</x-alert>
    @enderror

    <div class="grid gap-6 lg:grid-cols-3">
        <x-card class="lg:col-span-2">
            <form wire:submit="save" class="flex flex-col gap-5">
                <x-field :label="__('tickets.form.title')" for="title">
                    <input id="title" type="text" wire:model="title"
                           class="rounded-field border border-grey-100 bg-white px-3 py-2 text-sm text-grey-800">
                </x-field>

                <x-field :label="__('tickets.form.description')" for="description">
                    <textarea id="description" rows="8" wire:model="description"
                              class="rounded-field border border-grey-100 bg-white px-3 py-2 text-sm text-grey-800"></textarea>
                </x-field>

                <x-field :label="__('tickets.form.priority')" for="priority">
                    <select id="priority" wire:model="priority"
                            class="rounded-field border border-grey-100 bg-white px-3 py-2 text-sm text-grey-800">
                        @foreach ($priorities as $case)
                            <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                        @endforeach
                    </select>
                </x-field>

                <div>
                    <x-button type="submit">{{ __('tickets.form.submit') }}</x-button>
                </div>
            </form>
        </x-card>

        <div class="flex flex-col gap-6">
            @if ($ticket !== null)
                <x-card class="space-y-4">
                    <h2 class="text-xl font-bold text-grey-900">{{ __('tickets.list.columns.status') }}</h2>

                    <div class="flex flex-wrap gap-2">
                        <x-badge :tone="$ticket->status->tone()">{{ __($ticket->status->translationKey()) }}</x-badge>
                        <x-badge :tone="$ticket->priority->tone()">{{ __($ticket->priority->translationKey()) }}</x-badge>
                    </div>

                    <dl class="space-y-1 text-sm">
                        <div class="flex justify-between gap-4">
                            <dt class="text-grey-500">{{ __('tickets.list.columns.requester') }}</dt>
                            <dd>{{ $ticket->requester->name }}</dd>
                        </div>
                        <div class="flex justify-between gap-4">
                            <dt class="text-grey-500">{{ __('tickets.list.columns.assigned_technician') }}</dt>
                            <dd>{{ $ticket->assignedTechnician?->name ?? __('tickets.list.unassigned') }}</dd>
                        </div>
                    </dl>
                </x-card>

                <x-card class="space-y-4">
                    <h2 class="text-xl font-bold text-grey-900">{{ __('tickets.form.attachments_heading') }}</h2>

                    <ul class="space-y-1 text-sm">
                        @forelse ($attachments as $attachment)
                            <li wire:key="attachment-{{ $attachment->id }}" class="text-grey-800">{{ $attachment->name }}</li>
                        @empty
                            <li class="text-grey-500">{{ __('tickets.form.no_attachment') }}</li>
                        @endforelse
                    </ul>

                    <form wire:submit="attach" class="flex flex-col gap-3">
                        <x-field :label="__('tickets.form.attachment')" for="attachment">
                            <input id="attachment" type="file" wire:model="attachment"
                                   class="text-sm file:mr-3 file:rounded-field file:border-0 file:bg-grey-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-grey-800">
                        </x-field>

                        <div>
                            <x-button type="submit" variant="secondary">{{ __('tickets.form.attach') }}</x-button>
                        </div>
                    </form>
                </x-card>

                @if ($canAssign)
                    <x-card class="space-y-4">
                        <h2 class="text-xl font-bold text-grey-900">{{ __('tickets.form.assign') }}</h2>

                        <form wire:submit="assign" class="flex flex-col gap-3">
                            <x-field :label="__('tickets.form.technician')" for="technician">
                                <select id="technician" wire:model="technicianId"
                                        class="rounded-field border border-grey-100 bg-white px-3 py-2 text-sm text-grey-800">
                                    @foreach ($technicians as $technician)
                                        <option value="{{ $technician->id }}">{{ $technician->name }}</option>
                                    @endforeach
                                </select>
                            </x-field>

                            <div>
                                <x-button type="submit" variant="secondary">{{ __('tickets.form.assign') }}</x-button>
                            </div>
                        </form>
                    </x-card>
                @endif
            @endif
        </div>
    </div>
</div>
