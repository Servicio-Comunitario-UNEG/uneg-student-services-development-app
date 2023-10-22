<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view users");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, User $model): bool {
		return $user->can("view users");
	}

	/**
	 * Determine whether the user can create users.
	 */
	public function create(User $user): bool {
		return $user->canAny(["create users", "create admin users"]);
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, User $model): bool {
		// The user must have the permission and not be itself.
		return $user->can("edit users") && $user->id != $model->id;
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, User $model): bool {
		// The user must have the permission and not be itself.
		return $user->can("delete users") && $user->id != $model->id;
	}
}
