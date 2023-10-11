<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		// Reset cached roles and permissions.
		app()[
			\Spatie\Permission\PermissionRegistrar::class
		]->forgetCachedPermissions();

		// Create the permissions.
		$permissionNames = [
			// Users.
			"create users",
			"view users",
			"edit users",
			"delete users",

			// Headquarters.
			"create headquarters",
			"view headquarters",
			"edit headquarters",
			"delete headquarters",

			// Careers.
			"create careers",
			"view careers",
			"edit careers",
			"delete careers",
		];

		$permissions = collect($permissionNames)->map(function ($permission) {
			return ["name" => $permission, "guard_name" => "web"];
		});

		Permission::insert($permissions->toArray());

		// Create the roles.
		Role::create([
			"name" => "admin",
			"description" => "Administrador",
		])->givePermissionTo($permissionNames);

		Role::create([
			"name" => "coordinator",
			"description" => "Coordinador",
		])->givePermissionTo($permissionNames);

		Role::create([
			"name" => "representative",
			"description" => "Representante",
		])->givePermissionTo([]);
	}
}
