<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\City;
use App\Models\Headquarter;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder {
	/**
	 * Run the database seeds.
	 */
	public function run(): void {
		$cities = [
			[
				"name" => "Ciudad Guayana",
				"headquarters" => [
					"Ciudad Universitaria",
					"Villa Asia",
					"Chilemex",
				],
			],
			[
				"name" => "Upata",
				"headquarters" => ["Upata"],
			],
			[
				"name" => "Ciudad Bolívar",
				"headquarters" => ["Ciudad Bolívar"],
			],
			[
				"name" => "Guasipati",
				"headquarters" => ["Guasipati"],
			],
			[
				"name" => "El Callao",
				"headquarters" => ["El Callao"],
			],
			[
				"name" => "Santa Elena de Uairén",
				"headquarters" => ["Santa Elena de Uairén"],
			],
			[
				"name" => "Caicara del Orinoco",
				"headquarters" => ["Caicara del Orinoco"],
			],
			[
				"name" => "El Palmar",
				"headquarters" => ["El Palmar"],
			],
		];

		// Create the cities.
		foreach ($cities as $city) {
			$headquarters = array_map(
				fn($headquarter) => ["name" => $headquarter],
				$city["headquarters"],
			);

			// Create the city and assign the headquarters.
			City::firstOrCreate([
				"name" => $city["name"],
			])
				->headquarters()
				->createMany($headquarters);
		}
	}
}
