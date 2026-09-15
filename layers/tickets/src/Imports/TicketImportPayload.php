<?php

namespace Layers\Tickets\Imports;

final class TicketImportPayload
{
    /** @var array<int, array{line: int, title: string, description: string, priority: string, requester_email: string}> */
    public array $rows = [];

    /** @var array<int, array{line: int, reason: string}> */
    public array $rejections = [];

    /** @var array<string, int> */
    public array $requesterIdsByEmail = [];

    public int $created = 0;

    public function __construct(
        public readonly string $disk,
        public readonly string $path,
    ) {}

    public function reject(int $line, string $reason): void
    {
        $this->rejections[] = ['line' => $line, 'reason' => $reason];
    }

    /**
     * @return array<int, array{line: int, reason: string}>
     */
    public function sortedRejections(): array
    {
        $sorted = $this->rejections;

        usort($sorted, static fn (array $first, array $second): int => $first['line'] <=> $second['line']);

        return $sorted;
    }

    public function read(): int
    {
        return count($this->rows) + count($this->rejections);
    }
}
