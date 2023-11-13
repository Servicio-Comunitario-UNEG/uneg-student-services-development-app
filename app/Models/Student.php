<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
