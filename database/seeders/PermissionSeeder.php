<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Layers\Tickets\Enums\TicketPermission;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

final class PermissionSeeder extends Seeder
{
    public const REQUESTER = 'requester';

    public const TECHNICIAN = 'technician';

    public const MANAGER = 'manager';

    public function run(): void
    {
        foreach (TicketPermission::cases() as $permission) {
            Permission::findOrCreate($permission->value);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->seedProfile(self::REQUESTER, [
            TicketPermission::ViewOwn,
            TicketPermission::Create,
        ], 2);

        $this->seedProfile(self::TECHNICIAN, [
            TicketPermission::ViewAssigned,
        ], 2);

        $this->seedProfile(self::MANAGER, [
            TicketPermission::ViewAny,
            TicketPermission::Assign,
            TicketPermission::Close,
        ], 1);
    }

    /**
     * @param  array<int, TicketPermission>  $permissions
     */
    private function seedProfile(string $role, array $permissions, int $users): void
    {
        Role::findOrCreate($role)
            ->syncPermissions(array_map(
                fn (TicketPermission $permission): string => $permission->value,
                $permissions,
            ));

        User::factory()
            ->count($users)
            ->create()
            ->each(fn (User $user) => $user->assignRole($role));
    }
}
