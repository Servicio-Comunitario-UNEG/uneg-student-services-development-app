<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("supports", function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("user_id")
				->constrained()
				->cascadeOnDelete();
			$table
				->foreignId("student_id")
				->constrained()
				->cascadeOnDelete();
			$table->date("date");
			$table->enum("type", ["medical", "psychological"]);
			$table->string("description");
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("supports");
	}
};
