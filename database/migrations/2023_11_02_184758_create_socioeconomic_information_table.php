<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("socioeconomic_information", function (
			Blueprint $table,
		) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("student_id")
				->constrained()
				->cascadeOnUpdate()
				->cascadeOnDelete();
			$table->boolean("is_indigenous")->default(false);
			$table->boolean("is_disabled")->default(false);
			$table->unsignedInteger("graffar")->nullable();
			$table->string("situation")->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("socioeconomic_information");
	}
};
