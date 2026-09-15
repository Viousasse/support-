<div class="mx-auto flex max-w-sm flex-col gap-6 py-12">
    <div class="text-center">
        <p class="text-xs font-bold tracking-[0.2em] text-brand-600 uppercase">{{ config('app.name') }}</p>
        <h1 class="mt-2 font-serif text-3xl font-bold">{{ __('auth.heading') }}</h1>
    </div>

    <x-card>
        <form wire:submit="authenticate" class="flex flex-col gap-4">
            <x-field :label="__('auth.email')" for="email">
                <input id="email" type="email" autocomplete="username" wire:model="email"
                       class="rounded-md border border-ink-200 bg-sand-50 px-3 py-2 text-sm">
            </x-field>

            <x-field :label="__('auth.password')" for="password">
                <input id="password" type="password" autocomplete="current-password" wire:model="password"
                       class="rounded-md border border-ink-200 bg-sand-50 px-3 py-2 text-sm">
            </x-field>

            <x-button type="submit" class="mt-2 w-full">{{ __('auth.submit') }}</x-button>
        </form>
    </x-card>
</div>
