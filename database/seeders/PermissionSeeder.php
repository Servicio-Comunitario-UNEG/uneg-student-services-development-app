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
			"create non admin users",
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

			// Students.
			"create students",
			"view students",
			"edit students",
			"delete students",

			// Semesters.
			"create semesters",
			"view semesters",
			"edit semesters",
			"delete semesters",
		];

		foreach ($permissionNames as $permission) {
			Permission::firstOrCreate([
				"name" => $permission,
				"guard_name" => "web",
			]);
		}

		// Returns all the permissions but the skipped ones.
		$skipPermissions = function (array $permissionsToSkip) use (
			$permissionNames,
		) {
			return array_filter(
				$permissionNames,
				fn($permission) => !in_array($permission, $permissionsToSkip),
			);
		};

		// Create or update the roles.
		Role::updateOrCreate(
			["name" => "admin"],
			[
				"name" => "admin",
				"description" => "Administrador",
			],
		)->syncPermissions($skipPermissions(["create non admin users"]));

		Role::updateOrCreate(
			["name" => "coordinator"],
			[
				"name" => "coordinator",
				"description" => "Coordinador",
			],
		)->syncPermissions(
			$skipPermissions(["create users", "edit users", "delete users"]),
		);

		Role::updateOrCreate(
			["name" => "representative"],
			[
				"name" => "representative",
				"description" => "Representante",
			],
		)->syncPermissions([
			"create students",
			"view students",
			"edit students",
			"delete students",
		]);
	}
}
