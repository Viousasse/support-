<?php

namespace App\Tickets\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use App\Models\User;
use Layers\Tickets\Models\Ticket;

class TicketAssignedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Ticket $ticket
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): \Illuminate\Notifications\Messages\MailMessage
    {
        return (new \Illuminate\Notifications\Messages\MailMessage())
            ->subject('Nouveau ticket assigné')
            ->line('Un ticket vous a été assigné.')
            ->line('Titre : ' . $this->ticket->title)
            ->action('Voir le ticket', url('/tickets/' . $this->ticket->id));
    }
}