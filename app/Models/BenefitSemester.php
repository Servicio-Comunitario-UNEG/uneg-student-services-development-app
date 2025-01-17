<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BenefitSemester extends Model {
	use HasFactory;

	protected $table = "benefit_semester";

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["benefit_id", "semester_id", "amount"];

	/**
	 * The career that is given in a headquarter.
	 */
	public function benefit(): HasOne {
		return $this->hasOne(Benefit::class, "id", "benefit_id");
	}

	/**
	 * The headquarter that is paired to a career.
	 */
	public function semester(): HasOne {
		return $this->hasOne(Semester::class, "id", "semester_id");
	}

	/**
	 * The headquarters that offers this benefit in a semester.
	 */
	public function benefit_semester_headquarters(): HasMany {
		return $this->hasMany(
			BenefitSemesterHeadquarter::class,
			"benefit_semester_id",
			"id",
		);
	}
}
