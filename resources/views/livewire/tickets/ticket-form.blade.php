<div class="space-y-6">
    <h1 class="text-2xl font-semibold">
        {{ $ticket === null ? __('tickets.form.create_heading') : __('tickets.form.edit_heading') }}
    </h1>

    @if (session('status'))
        <p class="rounded bg-green-100 px-4 py-2 text-green-800">{{ session('status') }}</p>
    @endif

    @error('ticket')
        <p class="rounded bg-red-100 px-4 py-2 text-red-800">{{ $message }}</p>
    @enderror

    <form wire:submit="save" class="space-y-4">
        <div class="flex flex-col">
            <label for="title" class="text-sm font-medium">{{ __('tickets.form.title') }}</label>
            <input id="title" type="text" wire:model="title" class="rounded border-gray-300">
            @error('title')
                <span class="text-sm text-red-700">{{ $message }}</span>
            @enderror
        </div>

        <div class="flex flex-col">
            <label for="description" class="text-sm font-medium">{{ __('tickets.form.description') }}</label>
            <textarea id="description" rows="5" wire:model="description" class="rounded border-gray-300"></textarea>
            @error('description')
                <span class="text-sm text-red-700">{{ $message }}</span>
            @enderror
        </div>

        <div class="flex flex-col">
            <label for="priority" class="text-sm font-medium">{{ __('tickets.form.priority') }}</label>
            <select id="priority" wire:model="priority" class="rounded border-gray-300">
                @foreach ($priorities as $case)
                    <option value="{{ $case->value }}">{{ __($case->translationKey()) }}</option>
                @endforeach
            </select>
            @error('priority')
                <span class="text-sm text-red-700">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="rounded bg-gray-900 px-4 py-2 text-white">
            {{ __('tickets.form.submit') }}
        </button>
    </form>

    @if ($ticket !== null)
        <section class="space-y-3">
            <h2 class="text-lg font-semibold">{{ __('tickets.form.attachments_heading') }}</h2>

            <ul class="list-inside list-disc text-sm">
                @forelse ($attachments as $attachment)
                    <li wire:key="attachment-{{ $attachment->id }}">{{ $attachment->name }}</li>
                @empty
                    <li class="list-none text-gray-500">{{ __('tickets.form.no_attachment') }}</li>
                @endforelse
            </ul>

            <form wire:submit="attach" class="flex items-end gap-3">
                <div class="flex flex-col">
                    <label for="attachment" class="text-sm font-medium">{{ __('tickets.form.attachment') }}</label>
                    <input id="attachment" type="file" wire:model="attachment" class="rounded border-gray-300">
                    @error('attachment')
                        <span class="text-sm text-red-700">{{ $message }}</span>
                    @enderror
                </div>

                <button type="submit" class="rounded bg-gray-700 px-4 py-2 text-white">
                    {{ __('tickets.form.attach') }}
                </button>
            </form>
        </section>
    @endif

    @if ($canAssign)
        @if ($ticket !== null)
            <form wire:submit="assign" class="flex items-end gap-3">
                <div class="flex flex-col">
                    <label for="technician" class="text-sm font-medium">{{ __('tickets.form.technician') }}</label>
                    <select id="technician" wire:model="technicianId" class="rounded border-gray-300">
                        @foreach ($technicians as $technician)
                            <option value="{{ $technician->id }}">{{ $technician->name }}</option>
                        @endforeach
                    </select>
                </div>

                <button type="submit" class="rounded bg-blue-700 px-4 py-2 text-white">
                    {{ __('tickets.form.assign') }}
                </button>
            </form>
        @endif
    @endif
</div>
