<div class="mx-auto max-w-sm space-y-6">
    <h1 class="text-2xl font-semibold">{{ __('auth.heading') }}</h1>

    <form wire:submit="authenticate" class="space-y-4">
        <div class="flex flex-col">
            <label for="email" class="text-sm font-medium">{{ __('auth.email') }}</label>
            <input id="email" type="email" autocomplete="username" wire:model="email" class="rounded border-gray-300">
            @error('email')
                <span class="text-sm text-red-700">{{ $message }}</span>
            @enderror
        </div>

        <div class="flex flex-col">
            <label for="password" class="text-sm font-medium">{{ __('auth.password') }}</label>
            <input id="password" type="password" autocomplete="current-password" wire:model="password" class="rounded border-gray-300">
            @error('password')
                <span class="text-sm text-red-700">{{ $message }}</span>
            @enderror
        </div>

        <button type="submit" class="rounded bg-gray-900 px-4 py-2 text-white">
            {{ __('auth.submit') }}
        </button>
    </form>
</div>
