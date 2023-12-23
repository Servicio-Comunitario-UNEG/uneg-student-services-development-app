<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BenefitSemesterHeadquarter extends Model {
	use HasFactory;

	protected $table = "benefit_semester_headquarter";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["benefit_semester_id", "headquarter_id", "amount"];

	/**
	 * The headquarter that offers the benefit.
	 */
	public function headquarter(): HasOne {
		return $this->hasOne(Headquarter::class, "id", "headquarter_id");
	}

	/**
	 * The benefit semester offered by this headquarter.
	 */
	public function benefit_semester(): BelongsTo {
		return $this->belongsTo(
			BenefitSemester::class,
			"id",
			"benefit_semester_id",
			"benefit_semester",
		);
	}

	/**
	 * The students that recieves the benefit.
	 */
	public function students(): BelongsToMany {
		return $this->belongsToMany(
			Student::class,
			"benefit_semester_headquarter_student",
			"student_id",
			"id",
		);
	}
}
