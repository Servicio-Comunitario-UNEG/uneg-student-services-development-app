<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BenefitSemesterHeadquarterStudent extends Model {
	use HasFactory;

	protected $table = "benefit_semester_headquarter_student";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["benefit_semester_headquarter_id", "student_id"];

	/**
	 * The benefit given in a specific semester and headquarter to an student.
	 */
	public function benefit_semester_headquarter(): HasOne {
		return $this->hasOne(
			BenefitSemesterHeadquarter::class,
			"id",
			"benefit_semester_headquarter_id",
		);
	}

	/**
	 * The student who receives this benefit.
	 */
	public function student(): HasOne {
		return $this->hasOne(Student::class, "id", "student_id");
	}
}
