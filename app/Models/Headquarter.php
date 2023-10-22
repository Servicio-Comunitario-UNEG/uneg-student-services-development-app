<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Headquarter extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["name", "user_id"];

	/**
	 * Get the user that represents this headquarter.
	 */
	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}
}
