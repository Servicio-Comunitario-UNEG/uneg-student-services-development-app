<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = [
		"student_id",
		"professional_id",
		"date",
		"type",
		"description",
	];

	/**
	 * The user that created this service.
	 */
	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}

	/**
	 * The professinal that created made this service.
	 */
	public function professional(): BelongsTo {
		return $this->belongsTo(User::class, "professional_id", "id");
	}

	/**
	 * The student that recieved this service.
	 */
	public function student(): BelongsTo {
		return $this->belongsTo(Student::class);
	}
}
