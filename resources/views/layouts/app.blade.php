<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name') }}</title>
    <link rel="icon" href="{{ asset('images/xefi-chevron.svg') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="flex h-full flex-col bg-page font-sans text-sm text-grey-800 antialiased">
    @auth
        <header class="border-b border-grey-100 bg-white">
            <div class="mx-auto flex max-w-6xl flex-wrap items-center gap-x-10 gap-y-4 px-6 py-4">
                <a href="{{ route('tickets.index') }}" class="shrink-0">
                    <img src="{{ asset('images/xefi-logo.svg') }}" alt="{{ config('app.name') }}" class="h-5 w-auto">
                </a>

                <nav class="flex flex-1 flex-wrap items-center gap-7" aria-label="{{ __('layout.navigation') }}">
                    @foreach ([
                        'tickets.index' => __('layout.nav.tickets'),
                        'tickets.create' => __('layout.nav.new_ticket'),
                        'tickets.import' => __('layout.nav.import'),
                    ] as $route => $label)
                        <a
                            href="{{ route($route) }}"
                            @class([
                                'border-b-2 pb-1 transition-colors',
                                'border-red-500 font-semibold text-grey-900' => request()->routeIs($route),
                                'border-transparent text-grey-500 hover:text-grey-900' => ! request()->routeIs($route),
                            ])
                        >{{ $label }}</a>
                    @endforeach
                </nav>

                <div class="flex items-center gap-5">
                    <span class="text-grey-500">{{ auth()->user()->name }}</span>

                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="text-grey-500 underline-offset-4 hover:text-link hover:underline">
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

    <footer class="border-t border-grey-100 bg-white">
        <div class="mx-auto max-w-6xl px-6 py-5 text-xs text-grey-500">
            {{ __('layout.footer') }}
        </div>
    </footer>
</body>
</html>
