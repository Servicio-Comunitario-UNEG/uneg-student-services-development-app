<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("services", function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("user_id")
				->constrained()
				->restrictOnDelete();
			$table
				->foreignId("professional_id")
				->nullable()
				->constrained("users")
				->restrictOnDelete();
			$table
				->foreignId("student_id")
				->constrained()
				->restrictOnDelete();
			$table->date("date");
			$table->enum("type", ["medical", "psychosocial", "economical"]);
			$table->string("description");
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("services");
	}
};
