<?php

namespace Tests\Unit\Tickets;

use Layers\Tickets\Enums\TicketPriority;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class TicketPriorityTest extends TestCase
{
    /**
     * @return array<string, array{TicketPriority, int}>
     */
    public static function targets(): array
    {
        return [
            'low' => [TicketPriority::Low, 72],
            'normal' => [TicketPriority::Normal, 24],
            'high' => [TicketPriority::High, 8],
            'critical' => [TicketPriority::Critical, 2],
        ];
    }

    #[Test]
    #[DataProvider('targets')]
    public function it_carries_the_target_resolution_time_of_each_priority(
        TicketPriority $priority,
        int $hours,
    ): void {
        $this->assertSame($hours, $priority->targetResolutionHours());
    }
}
