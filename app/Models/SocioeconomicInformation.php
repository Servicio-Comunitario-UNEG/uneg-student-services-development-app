<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocioeconomicInformation extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		"student_id",
		"is_indigenous",
		"is_disabled",
		"graffar",
		"situation",
	];

	/**
	 * Get the student of this socioeconomic information.
	 */
	public function student(): BelongsTo {
		return $this->belongsTo(Student::class);
	}
}
