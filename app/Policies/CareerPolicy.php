<?php

namespace App\Policies;

use App\Models\Career;
use App\Models\User;

class CareerPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view careers");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, Career $career): bool {
		return $user->can("view careers");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create careers");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, Career $career): bool {
		return $user->can("edit careers");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, Career $career): bool {
		return $user->can("delete careers");
	}
}