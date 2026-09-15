<?php

namespace Layers\Tickets\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Layers\Tickets\Events\TicketAssigned;
use Layers\Tickets\Listeners\SendTicketAssignedNotification;
use Layers\Tickets\Models\Attachment;
use Layers\Tickets\Models\Comment;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Policies\AttachmentPolicy;
use Layers\Tickets\Policies\CommentPolicy;
use Layers\Tickets\Policies\TicketPolicy;

final class TicketsServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__.'/../../database/migrations');

        Gate::policy(Ticket::class, TicketPolicy::class);
        Gate::policy(Attachment::class, AttachmentPolicy::class);
        Gate::policy(Comment::class, CommentPolicy::class);

        Event::listen(TicketAssigned::class, SendTicketAssignedNotification::class);
    }
}
