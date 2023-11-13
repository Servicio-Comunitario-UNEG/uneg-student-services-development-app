<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CareerHeadquarter extends Model {
	protected $table = "career_headquarter";

	public function career(): HasOne {
		return $this->hasOne(Career::class, "id", "career_id");
	}

	public function headquarter(): HasOne {
		return $this->hasOne(Headquarter::class, "id", "headquarter_id");
	}

	public function students(): HasMany {
		return $this->hasMany(Student::class);
	}
}
