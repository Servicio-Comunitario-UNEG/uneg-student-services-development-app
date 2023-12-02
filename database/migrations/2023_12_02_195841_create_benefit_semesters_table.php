<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("benefit_semester", function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("benefit_id")
				->constrained()
				->cascadeOnDelete();
			$table
				->foreignId("semester_id")
				->constrained()
				->cascadeOnDelete();
			$table->unsignedInteger("amount")->default(0);
			$table->unique(["benefit_id", "semester_id"]);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("benefit_semester");
	}
};
