<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
	 * The benefit semester offered by this headquarter.
	 */
	public function benefit_semester(): BelongsTo {
		return $this->belongsTo(
			BenefitSemester::class,
			"id",
			"benefit_semester_id",
		);
	}
}
