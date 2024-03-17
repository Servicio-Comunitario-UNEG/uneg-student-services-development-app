<?php

namespace App\Policies;

use App\Models\Service;
use App\Models\User;

class ServicePolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view services");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, Service $service): bool {
		return $user->can("view services");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create services");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, Service $service): bool {
		return ($user->can("edit services") && $service->user()->is($user)) ||
			$user->can("edit any service");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, Service $service): bool {
		return ($user->can("delete services") && $service->user()->is($user)) ||
			$user->can("delete any service");
	}
}
