<div class="mx-auto flex max-w-sm flex-col gap-6 py-16">
    <div class="flex flex-col items-center gap-4">
        <img src="{{ asset('images/xefi-logo.svg') }}" alt="{{ config('app.name') }}" class="h-6 w-auto">
        <h1 class="text-2xl font-bold text-grey-900">{{ __('auth.heading') }}</h1>
    </div>

    <x-card>
        <form wire:submit="authenticate" class="flex flex-col gap-4">
            <x-field :label="__('auth.email')" for="email">
                <x-input id="email" type="email" autocomplete="username" wire:model="email"
                         placeholder="{{ __('auth.email_placeholder') }}" />
            </x-field>

            <x-field :label="__('auth.password')" for="password">
                <x-input id="password" type="password" autocomplete="current-password" wire:model="password" />
            </x-field>

            <x-button type="submit" class="mt-2 w-full">{{ __('auth.submit') }}</x-button>
        </form>
    </x-card>
</div>
