<?php

namespace App\Policies;

use App\Models\Headquarter;
use App\Models\User;

class HeadquarterPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view headquarters");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, Headquarter $headquarter): bool {
		return $user->can("view headquarters");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create headquarters");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, Headquarter $headquarter): bool {
		return $user->can("edit headquarters");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, Headquarter $headquarter): bool {
		return $user->can("delete headquarters");
	}
}
