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
			"Administración De Empresas",
			"Administración Mención Banca Y Finanzas",
			"Ciencias Ambientales",
			"Ciencias Fiscales",
			"Contaduría Pública",
			"Educación En Ciencias: Física, Química Y Biología",
			"Educación Integral",
			"Educación. Mención Educación Física Deporte Y Recreación",
			"Educación. Mención Educación Física, Deporte Y Recreación",
			"Educación. Mención Lengua Y Literatura",
			"Educación. Mención Matemática",
			"Ingeniería De Producción Animal",
			"Ingeniería En Industrias Forestales",
			"Ingeniería En Informática",
			"Ingeniería En Materiales",
			"Ingeniería Industrial",
			"Licenciatura En Gestión De Alojamiento Turístico",
			"T.S.U. Empresa De Alojamiento Turístico",
			"T.S.U. Turismo",
			"Tecnología En Producción Agropecuaria",
		];

		foreach ($careers as $career) {
			Career::firstOrCreate([
				"name" => $career,
			]);
		}
	}
}
