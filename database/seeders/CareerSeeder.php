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
		$careers = [
			["name" => "Administración De Empresas", "headquarters" => [1]],
			[
				"name" => "Administración Mención Banca Y Finanzas",
				"headquarters" => [1, 5],
			],
			["name" => "Ciencias Ambientales", "headquarters" => []],
			["name" => "Ciencias Fiscales", "headquarters" => [4, 5, 7, 8, 9]],
			[
				"name" => "Contaduría Pública",
				"headquarters" => [1, 4, 5, 6, 7, 8, 9],
			],
			[
				"name" => "Educación En Ciencias: Física, Química Y Biología",
				"headquarters" => [],
			],
			["name" => "Educación Integral", "headquarters" => [1, 5, 6, 9]],
			[
				"name" =>
					"Educación. Mención Educación Física, Deporte Y Recreación",
				"headquarters" => [5, 6, 9],
			],
			[
				"name" => "Educación. Mención Lengua Y Literatura",
				"headquarters" => [5, 6],
			],
			[
				"name" => "Educación. Mención Matemática",
				"headquarters" => [3, 5],
			],
			[
				"name" => "Ingeniería De Producción Animal",
				"headquarters" => [4],
			],
			[
				"name" => "Ingeniería En Industrias Forestales",
				"headquarters" => [4],
			],
			["name" => "Ingeniería En Informática", "headquarters" => [1]],
			["name" => "Ingeniería En Materiales", "headquarters" => []],
			["name" => "Ingeniería Industrial", "headquarters" => [2, 6]],
			[
				"name" => "Licenciatura En Gestión De Alojamiento Turístico",
				"headquarters" => [5, 8, 9],
			],
			[
				"name" => "T.S.U. Empresa De Alojamiento Turístico",
				"headquarters" => [5],
			],
			["name" => "T.S.U. Turismo", "headquarters" => [5]],
			[
				"name" => "Tecnología En Producción Agropecuaria",
				"headquarters" => [4, 8, 10],
			],
		];

		foreach ($careers as $career) {
			Career::firstOrCreate(["name" => $career["name"]])
				->headquarters()
				->sync($career["headquarters"]);
		}
	}
}
