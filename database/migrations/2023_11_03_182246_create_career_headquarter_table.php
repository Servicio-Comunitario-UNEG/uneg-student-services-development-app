<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("career_headquarter", function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("career_id")
				->constrained()
				->cascadeOnDelete();
			$table
				->foreignId("headquarter_id")
				->constrained()
				->cascadeOnDelete();
			$table->unique(["career_id", "headquarter_id"]);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("career_headquarter");
	}
};
