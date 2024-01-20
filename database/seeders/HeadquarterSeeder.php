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
		$headquarters = [
			"Ciudad Universitaria",
			"Guasipati",
			"Jardín Botánico",
			"El Palmar",
			"El Callao",
			"Villa Asia",
		];

		foreach ($headquarters as $headquarter) {
			Headquarter::firstOrCreate([
				"name" => $headquarter,
			]);
		}
	}
}
