<?php

namespace App\Policies;

use App\Models\Semester;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SemesterPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view semesters");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, Semester $semester): bool {
		return $user->can("view semesters");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create semesters");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, Semester $semester): bool {
		return $user->can("edit semesters");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, Semester $semester): bool {
		return $user->can("delete semesters");
	}
}
