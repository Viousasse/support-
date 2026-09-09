<?php

namespace Layers\Tickets\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Listeners\SendTicketAssignedNotification;

class TicketsServiceProvider extends ServiceProvider
{
    public function register(): void
    {
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');

        Event::listen(
            TicketAssigned::class,
            SendTicketAssignedNotification::class,
        );
    }
}