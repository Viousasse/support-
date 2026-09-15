<?php

namespace Layers\Tickets\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Layers\Tickets\Models\Ticket;
use Layers\Tickets\Notifications\Channels\SendsUrgencyPayload;
use Layers\Tickets\Notifications\Concerns\NotifiesByTicketPriority;

final class TicketEscalatedNotification extends Notification implements SendsUrgencyPayload
{
    use NotifiesByTicketPriority;
    use Queueable;

    public function __construct(public readonly Ticket $ticket) {}

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('tickets.notifications.escalated.subject'))
            ->line(__('tickets.notifications.escalated.introduction', [
                'title' => $this->ticket->title,
            ]))
            ->line(__('tickets.notifications.escalated.priority', [
                'priority' => __($this->ticket->priority->translationKey()),
            ]))
            ->action(__('tickets.notifications.escalated.action'), route('tickets.index'));
    }
}
