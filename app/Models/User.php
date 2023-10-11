<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable {
	use HasApiTokens, HasFactory, Notifiable, HasRoles;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["name", "email", "password"];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = ["password", "remember_token"];

	/**
	 * The role name the user has.
	 *
	 * @var array
	 */
	protected $appends = ["role_name"];

	/**
	 * The attributes that should be cast.
	 *
	 * @var array<string, string>
	 */
	protected $casts = [
		"email_verified_at" => "datetime",
		"password" => "hashed",
	];

	/**
	 * Get the role name the user has.
	 */
	protected function roleName(): Attribute {
		$roles = $this->getRoleNames();

		return new Attribute(get: fn() => empty($roles) ? null : $roles[0]);
	}

	/**
	 * Get the headquarter that this user represents.
	 */
	public function headquarter(): HasOne {
		return $this->hasOne(Headquarter::class);
	}
}
