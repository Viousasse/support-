<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'view own tickets',
            'view assigned tickets',
            'view all tickets',
            'create tickets',
            'assign tickets',
            'close tickets',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $requester = Role::findOrCreate('requester');
        $requester->syncPermissions([
            'view own tickets',
            'create tickets',
        ]);

        $technician = Role::findOrCreate('technician');
        $technician->syncPermissions([
            'view assigned tickets',
        ]);

        $manager = Role::findOrCreate('manager');
        $manager->syncPermissions([
            'view all tickets',
            'assign tickets',
            'close tickets',
        ]);

        $requesterUser = \App\Models\User::factory()->create(['name' => 'Alice Requester']);
        $requesterUser->assignRole('requester');

        $technicianUser = \App\Models\User::factory()->create(['name' => 'Bob Technician']);
        $technicianUser->assignRole('technician');

        $managerUser = \App\Models\User::factory()->create(['name' => 'Carla Manager']);
        $managerUser->assignRole('manager');
    }
}