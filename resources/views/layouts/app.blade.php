<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="flex h-full flex-col bg-sand-200 font-sans text-ink-900 antialiased">
    <div class="h-1 w-full bg-brand-600"></div>

    @auth
        <header class="border-b border-sand-200 bg-sand-50">
            <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4">
                <a href="{{ route('tickets.index') }}" class="font-serif text-lg font-bold tracking-tight">
                    {{ config('app.name') }}
                </a>

                <nav class="flex flex-1 flex-wrap items-center gap-6 text-sm" aria-label="{{ __('layout.navigation') }}">
                    @foreach ([
                        'tickets.index' => __('layout.nav.tickets'),
                        'tickets.create' => __('layout.nav.new_ticket'),
                        'tickets.import' => __('layout.nav.import'),
                    ] as $route => $label)
                        <a
                            href="{{ route($route) }}"
                            @class([
                                'border-b-2 pb-1 transition-colors',
                                'border-brand-600 font-semibold text-brand-600' => request()->routeIs($route),
                                'border-transparent text-ink-500 hover:text-ink-900' => ! request()->routeIs($route),
                            ])
                        >{{ $label }}</a>
                    @endforeach
                </nav>

                <div class="flex items-center gap-4 text-sm">
                    <span class="text-ink-500">{{ auth()->user()->name }}</span>

                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="text-ink-500 underline-offset-4 hover:text-brand-600 hover:underline">
                            {{ __('auth.sign_out') }}
                        </button>
                    </form>
                </div>
            </div>
        </header>
    @endauth

    <main class="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        {{ $slot }}
    </main>

    <footer class="border-t border-sand-200 bg-sand-50">
        <div class="mx-auto max-w-6xl px-6 py-5 text-xs text-ink-500">
            {{ __('layout.footer') }}
        </div>
    </footer>
</body>
</html>
