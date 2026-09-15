<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50 text-gray-900 antialiased">
    <main class="mx-auto max-w-6xl p-6">
        @auth
            <form method="POST" action="{{ route('logout') }}" class="mb-6 text-right">
                @csrf
                <button type="submit" class="text-sm underline">{{ __('auth.sign_out') }}</button>
            </form>
        @endauth

        {{ $slot }}
    </main>
</body>
</html>
