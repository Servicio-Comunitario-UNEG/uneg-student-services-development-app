<?php

namespace App\Policies;

use App\Models\Student;
use App\Models\User;

class StudentPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view students");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, Student $student): bool {
		return $user->can("view students");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create students");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, Student $student): bool {
		return $user->can("edit students");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, Student $student): bool {
		return $user->can("delete students");
	}
}
