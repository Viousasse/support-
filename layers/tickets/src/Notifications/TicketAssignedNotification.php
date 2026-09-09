<?php

namespace Layers\Tickets\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Layers\Tickets\Models\Ticket;

class TicketAssignedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Ticket $ticket,
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage())
            ->subject(__('tickets.notifications.assigned.subject'))
            ->line(__('tickets.notifications.assigned.introduction'))
            ->line(__('tickets.notifications.assigned.ticket_title', [
                'title' => $this->ticket->title,
            ]))
            ->action(
                __('tickets.notifications.assigned.action'),
                url("/tickets/{$this->ticket->id}"),
            );
    }
}