<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder {
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

			// Supports.
			"create supports",
			"view supports",
			"edit supports",
			"delete supports",

			// Benefits.
			"create benefits",
			"view benefits",
			"edit benefits",
			"delete benefits",
			"assign benefits",
		];

		foreach ($permissionNames as $permission) {
			Permission::firstOrCreate([
				"name" => $permission,
				"guard_name" => "web",
			]);
		}

		// Create or update the roles.
		Role::updateOrCreate(
			["name" => "admin"],
			[
				"name" => "admin",
				"description" => "Administrador",
			],
		)->syncPermissions($permissionNames);

		Role::updateOrCreate(
			["name" => "coordinator"],
			[
				"name" => "coordinator",
				"description" => "Coordinador",
			],
		)->syncPermissions($permissionNames);

		Role::updateOrCreate(
			["name" => "secretary"],
			[
				"name" => "secretary",
				"description" => "Secretario",
			],
		)->syncPermissions($permissionNames);

		Role::updateOrCreate(
			["name" => "representative"],
			[
				"name" => "representative",
				"description" => "Representante",
			],
		)->syncPermissions([
			// Supports.
			"view supports",

			// Students.
			"create students",
			"view students",
			"edit students",
			"delete students",

			// Benefits.
			"assign benefits",
		]);

		Role::updateOrCreate(
			["name" => "medical-staff"],
			[
				"name" => "medical-staff",
				"description" => "Personal Médico",
			],
		)->syncPermissions([
			// Students.
			"view students",

			// Supports.
			"create supports",
			"view supports",
			"edit supports",
			"delete supports",
		]);
	}
}
