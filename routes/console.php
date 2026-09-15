<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Layers\Tickets\Console\EscalateOverdueTicketsCommand;
use Layers\Tickets\Models\AttributeChange;
use Layers\Tickets\Models\Ticket;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
Schedule::command('model:prune', [
    '--model' => [Ticket::class, AttributeChange::class],
])->daily();

Schedule::command(EscalateOverdueTicketsCommand::class)->hourly();
