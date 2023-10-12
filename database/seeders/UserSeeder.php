<?php

namespace Database\Seeders;

use App\Models\User;
use Exception;
use Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		$users = [
			[
				"email" => "alvarojrr79@gmail.com",
				"password" => Hash::make("12345678"),
				"name" => "Alvaro Resplandor",
			],
		];

		// Create the admin users.
		foreach ($users as $user) {
			try {
				User::firstOrCreate($user)->assignRole("admin");
			} catch (Exception $e) {
			}
		}
	}
}
