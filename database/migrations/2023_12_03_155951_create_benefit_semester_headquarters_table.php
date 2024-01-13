<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("benefit_semester_headquarter", function (
			Blueprint $table,
		) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("benefit_semester_id")
				->constrained("benefit_semester")
				->cascadeOnDelete();
			$table
				->foreignId("headquarter_id")
				->constrained()
				->cascadeOnDelete();
			$table->unsignedInteger("amount")->default(0);
			$table->unique(["benefit_semester_id", "headquarter_id"]);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("benefit_semester_headquarter");
	}
};
