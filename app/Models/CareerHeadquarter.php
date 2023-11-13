<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CareerHeadquarter extends Model {
	protected $table = "career_headquarter";

	/**
	 * The career that is given in a headquarter.
	 */
	public function career(): HasOne {
		return $this->hasOne(Career::class, "id", "career_id");
	}

	/**
	 * The headquarter that is paired to a career.
	 */
	public function headquarter(): HasOne {
		return $this->hasOne(Headquarter::class, "id", "headquarter_id");
	}

	/**
	 * The students that belongs to this career and headquarter pair.
	 */
	public function students(): HasMany {
		return $this->hasMany(Student::class);
	}
}
