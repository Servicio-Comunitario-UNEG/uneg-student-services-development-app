<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Benefit extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["name"];

	/**
	 * The semesters this benefit is offered.
	 */
	public function semesters(): BelongsToMany {
		return $this->belongsToMany(Semester::class, "benefit_semester");
	}
}
