<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Support extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		"user_id",
		"student_id",
		"date",
		"type",
		"description",
	];

	/**
	 * The user that created this support.
	 */
	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}

	/**
	 * The student that recieved this support.
	 */
	public function student(): BelongsTo {
		return $this->belongsTo(Student::class);
	}
}
