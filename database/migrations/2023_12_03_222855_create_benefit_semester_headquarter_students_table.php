ve
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void {
		Schema::create("benefit_semester_headquarter_student", function (
			Blueprint $table,
		) {
			$table->id();
			$table->timestamps();
			$table
				->foreignId("benefit_id")
				->constrained("benefit_semester_headquarter")
				->cascadeOnDelete();
			$table
				->foreignId("student_id")
				->constrained()
				->cascadeOnDelete();
			$table->unique(
				["benefit_id", "student_id"],
				"benefit_semester_headquarter_student_unique",
			);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void {
		Schema::dropIfExists("benefit_semester_headquarter_student");
	}
};

