<?php

namespace App\Policies;

use App\Models\BenefitSemester;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BenefitSemesterPolicy {
	/**
	 * Determine whether the user can view any models.
	 */
	public function viewAny(User $user): bool {
		return $user->can("view benefits");
	}

	/**
	 * Determine whether the user can view the model.
	 */
	public function view(User $user, BenefitSemester $benefitSemester): bool {
		return $user->can("view benefits");
	}

	/**
	 * Determine whether the user can create models.
	 */
	public function create(User $user): bool {
		return $user->can("create benefits");
	}

	/**
	 * Determine whether the user can update the model.
	 */
	public function update(User $user, BenefitSemester $benefitSemester): bool {
		return $user->can("edit benefits");
	}

	/**
	 * Determine whether the user can delete the model.
	 */
	public function delete(User $user, BenefitSemester $benefitSemester): bool {
		return $user->can("delete benefits");
	}
}
