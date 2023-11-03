<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		"email",
		"identity_card",
		"first_name",
		"last_name",
		"cell_phone",
		"sex",
		"birth_date",
		"second_name",
		"second_last_name",
		"room_phone",
		"address",
	];

	/**
	 * Get the socieconomic information of this student.
	 */
	public function socioeconomicInformation(): HasOne {
		return $this->hasOne(SocioeconomicInformation::class);
	}
}
