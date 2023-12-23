<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		"career_headquarter_id",
		"email",
		"identity_card",
		"first_name",
		"last_name",
		"cell_phone",
		"sex",
		"birth_date",
		"is_indigenous",
		"is_disabled",
		"second_name",
		"second_last_name",
		"room_phone",
		"address",
		"graffar",
		"socioeconomic_situation",
	];

	/**
	 * Get the identityCard the user has.
	 */
	protected function identityCard(): Attribute {
		return new Attribute(
			get: function (string $value = "") {
				return [
					"nationality" => $value[0],
					"serial" => substr($value, 1),
				];
			},
		);
	}

	/**
	 * The career and headquarter where the student studies.
	 */
	public function career_headquarter(): BelongsTo {
		return $this->belongsTo(CareerHeadquarter::class);
	}

	/**
	 * The supports this student has received.
	 */
	public function supports(): HasMany {
		return $this->hasMany(Support::class);
	}

	/**
	 * The benefits the student receives in a semester.
	 */
	public function benefits(): BelongsToMany {
		return $this->belongsToMany(
			BenefitSemesterHeadquarter::class,
			"benefit_semester_headquarter_student",
			"benefit_semester_headquarter_id",
			"id",
		);
	}
}
