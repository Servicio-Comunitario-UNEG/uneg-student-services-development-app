<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Headquarter;
use Illuminate\Database\Seeder;

class HeadquarterSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		Headquarter::factory()
			->count(20)
			->create();
	}
}