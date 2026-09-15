<?php

namespace Layers\Tickets\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Layers\Tickets\Models\Ticket;

final class TicketAssignedNotification extends Notification
{
    use Queueable;

    public function __construct(public readonly Ticket $ticket) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('tickets.notifications.assigned.subject'))
            ->line(__('tickets.notifications.assigned.introduction'))
            ->line(__('tickets.notifications.assigned.ticket_title', [
                'title' => $this->ticket->title,
            ]))
            ->action(
                __('tickets.notifications.assigned.action'),
                route('tickets.index'),
            );
    }
}
