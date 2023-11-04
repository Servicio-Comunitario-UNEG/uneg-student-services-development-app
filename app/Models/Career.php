<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Career extends Model {
	use HasFactory;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["name"];

	/**
	 * The attributes that should be appended.
	 *
	 * @var array
	 */
	protected $appends = ["headquarters_id"];

	/**
	 * The headquarters where this career is given.
	 */
	public function headquarters(): BelongsToMany {
		return $this->belongsToMany(Headquarter::class);
	}

	/**
	 * Get the permissions the user has.
	 */
	protected function headquartersId(): Attribute {
		return new Attribute(
			get: fn() => $this->headquarters()->allRelatedIds(),
		);
	}
}
