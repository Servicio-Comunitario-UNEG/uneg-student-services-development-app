<?php

namespace App\Http\Requests;

use App\Models\BenefitSemester;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;

class StoreBenefitSemesterRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("create", User::class);
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
	 */
	public function rules(): array {
		return [
			"benefit_id" => "required|integer|exists:benefits,id",
			"semester_id" => [
				"required",
				"integer",
				"exists:semesters,id",
				Rule::unique(BenefitSemester::class)->when(
					$this->benefit_id,
					function (Unique $query, $benefitId) {
						return $query->where("benefit_id", $benefitId);
					},
				),
			],
			"amount" => "required|integer|min:1",
		];
	}
}
