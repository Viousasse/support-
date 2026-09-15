<?php

namespace Layers\Tickets\Notifications\Policies;

use Layers\Tickets\Enums\TicketPriority;
use ReflectionClass;
use SplFileInfo;
use Symfony\Component\Finder\Finder;

final class TicketNotificationPolicies
{
    /** @var array<string, TicketNotificationPolicy>|null */
    private static ?array $resolved = null;

    public function for(TicketPriority $priority): TicketNotificationPolicy
    {
        return $this->all()[$priority->value] ?? new StandardTicketNotificationPolicy;
    }

    /**
     * @return array<string, TicketNotificationPolicy>
     */
    private function all(): array
    {
        if (self::$resolved !== null) {
            return self::$resolved;
        }

        $policies = [];

        foreach (Finder::create()->files()->in(__DIR__)->name('*.php') as $file) {
            $policy = $this->instantiate($file);

            if ($policy === null) {
                continue;
            }

            foreach ($policy->handles() as $priority) {
                $policies[$priority->value] = $policy;
            }
        }

        return self::$resolved = $policies;
    }

    private function instantiate(SplFileInfo $file): ?TicketNotificationPolicy
    {
        $candidate = __NAMESPACE__.'\\'.$file->getBasename('.php');

        if (! class_exists($candidate)) {
            return null;
        }

        $reflection = new ReflectionClass($candidate);

        if (! $reflection->isInstantiable()) {
            return null;
        }

        $policy = $reflection->newInstance();

        return $policy instanceof TicketNotificationPolicy ? $policy : null;
    }
}
