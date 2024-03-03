<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Headquarter extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["name"];

	/**
	 * Get the user that represents this headquarter.
	 */
	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}

	/**
	 * The city where is located this headquarter.
	 */
	public function city(): BelongsTo {
		return $this->belongsTo(City::class);
	}

	/**
	 * The careers this headquarter offers.
	 */
	public function careers(): BelongsToMany {
		return $this->belongsToMany(Career::class)
			->as("academic_offer")
			->withPivot(["id"]);
	}
}
