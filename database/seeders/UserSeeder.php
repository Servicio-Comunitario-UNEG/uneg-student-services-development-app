<?php

namespace Database\Seeders;

use App\Models\User;
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

		// Create admin users
		foreach ($users as $user) {
			$user = User::create($user);
			$user->assignRole("admin");
		}
	}
}
