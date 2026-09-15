<?php

namespace Layers\Tickets\Console;

use Illuminate\Console\Command;
use Layers\Tickets\Actions\EscalateOverdueTickets;

final class EscalateOverdueTicketsCommand extends Command
{
    protected $signature = 'tickets:escalate-overdue';

    protected $description = 'Escalate the unresolved tickets that went past the target of their priority';

    public function handle(EscalateOverdueTickets $action): int
    {
        $report = $action->execute();

        $this->table(
            [
                __('tickets.console.examined'),
                __('tickets.console.escalated'),
                __('tickets.console.flagged'),
            ],
            [[$report['examined'], $report['escalated'], $report['flagged']]],
        );

        return self::SUCCESS;
    }
}
