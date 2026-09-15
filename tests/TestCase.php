<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Layers\Tickets\Enums\TicketPermission;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

abstract class TestCase extends BaseTestCase
{
    protected function userWithPermissions(TicketPermission ...$permissions): User
    {
        $registrar = app(PermissionRegistrar::class);
        $registrar->forgetCachedPermissions();

        foreach (TicketPermission::cases() as $permission) {
            Permission::findOrCreate($permission->value);
        }

        $registrar->forgetCachedPermissions();

        $user = User::factory()->create();

        $user->givePermissionTo(array_map(
            fn (TicketPermission $permission): string => $permission->value,
            $permissions,
        ));

        $registrar->forgetCachedPermissions();

        return $user;
    }
}
