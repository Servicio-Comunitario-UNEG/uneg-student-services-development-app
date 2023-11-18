<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("semesters", function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table->year("year");
			$table->unsignedTinyInteger("lapse");
			$table->boolean("is_active")->default(false);
			$table->unique(["year", "lapse"]);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("semesters");
	}
};
