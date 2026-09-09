<?php

namespace App\Providers;

use App\Policies\TicketPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Layers\Tickets\Models\Ticket;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Gate::policy(Ticket::class, TicketPolicy::class);
    }
}