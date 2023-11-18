<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable {
	use HasApiTokens, HasFactory, Notifiable, HasRoles;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array<int, string>
	 */
	protected $fillable = ["name", "email", "password", "identity_card"];

	/**
	 * The attributes that should be hidden for serialization.
	 *
	 * @var array<int, string>
	 */
	protected $hidden = ["password", "remember_token", "roles", "permissions"];

	/**
	 * The attributes that should be appended.
	 *
	 * @var array
	 */
	protected $appends = ["current_role", "permission_names"];

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
	 * Get the current role this user has.
	 */
	protected function currentRole(): Attribute {
		$role = null;

		// As it will be used only a single role per user, then take the first one.
		$roleName = $this->getRoleNames()?->first();

		if (is_string($roleName)) {
			$role = Role::findByName($roleName)->setVisible([
				"name",
				"description",
			]);
		}

		return new Attribute(get: fn() => $role);
	}

	/**
	 * Get the identityCard the user has.
	 */
	protected function identityCard(): Attribute {
		return new Attribute(
			get: function (string $value = "") {
				return [
					"nationality" => $value[0],
					"serial" => substr($value, 1),
				];
			},
		);
	}

	/**
	 * Get the permissions the user has.
	 */
	protected function permissionNames(): Attribute {
		return new Attribute(
			get: fn() => $this->getPermissionsViaRoles()->pluck("name"),
		);
	}

	/**
	 * Get the headquarter that this user represents.
	 */
	public function headquarter(): HasOne {
		return $this->hasOne(Headquarter::class);
	}
}
