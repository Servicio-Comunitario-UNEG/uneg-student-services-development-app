<?php

namespace App\Policies;

use App\Models\Support;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SupportPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view supports");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, Support $support): bool {
		return $user->can("view supports");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create supports");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, Support $support): bool {
		return $user->can("edit supports");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, Support $support): bool {
		return $user->can("delete supports");
	}
}
