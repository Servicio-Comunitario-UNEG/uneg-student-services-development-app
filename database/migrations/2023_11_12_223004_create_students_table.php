<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("students", function (Blueprint $table) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("career_headquarter_id")
				->nullable()
				->constrained("career_headquarter")
				->cascadeOnUpdate()
				->nullOnDelete();
			$table->string("email")->unique();
			$table->string("identity_card")->unique();
			$table->string("first_name");
			$table->string("last_name");
			$table->string("cell_phone");
			$table->enum("sex", ["M", "F"]);
			$table->date("birth_date");
			$table->boolean("is_indigenous")->default(false);
			$table->boolean("is_disabled")->default(false);
			$table
				->integer("scheduled_dining_room_use", false, true)
				->default(0);
			$table->string("second_name")->nullable();
			$table->string("second_last_name")->nullable();
			$table->string("room_phone")->nullable();
			$table->string("address")->nullable();
			$table->unsignedInteger("graffar")->nullable();
			$table->string("socioeconomic_situation")->nullable();
			$table->string("ethnic")->nullable();
			$table->string("type_of_disability")->nullable();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("students");
	}
};
