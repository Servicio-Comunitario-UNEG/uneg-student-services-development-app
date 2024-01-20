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
				"identity_card" => "V28385587",
			],
			[
				"email" => "antonietta3012@gmail.com",
				"password" => Hash::make("12345678"),
				"name" => "Antonietta Palazzo",
				"identity_card" => "V28619939",
			],
			[
				"email" => "valekmedina1482@gmail.com",
				"password" => Hash::make("12345678"),
				"name" => "Valery Medina",
				"identity_card" => "V29643312",
			],
		];

		// Create the admin users.
		foreach ($users as $user) {
			User::firstOrCreate($user)->assignRole("admin");
		}
	}
}
