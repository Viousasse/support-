<?php

namespace Layers\Tickets\Providers;

use Illuminate\Support\ServiceProvider;

class TicketsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');
    }
}
