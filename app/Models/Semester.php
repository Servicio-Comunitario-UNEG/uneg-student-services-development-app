<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Semester extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["year", "lapse", "is_active"];

	/**
	 * The benefits that are offered in this semester.
	 */
	public function benefits(): BelongsToMany {
		return $this->belongsToMany(Benefit::class, "benefit_semester");
	}
}
