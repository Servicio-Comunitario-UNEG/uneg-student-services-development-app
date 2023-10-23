<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Career;
use Illuminate\Database\Seeder;

class CareerSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		Career::factory()
			->count(20)
			->create();
	}
}
