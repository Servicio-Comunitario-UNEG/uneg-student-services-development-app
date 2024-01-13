<?php

namespace App\Http\Requests;

use App\Models\BenefitSemester;
use App\Models\BenefitSemesterHeadquarter;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;

class UpdateBenefitSemesterRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("update", $this->benefits_semester);
	}

	/**
	 * Prepare the data for validation.
	 */
	protected function prepareForValidation(): void {
		$benefitSemesterHeadquarters =
			$this->benefit_semester_headquarters ?? [];

		$amount = 0;

		foreach ($benefitSemesterHeadquarters as $benefitSemesterHeadquarter) {
			if (array_key_exists("amount", $benefitSemesterHeadquarter)) {
				$headquarterAmount = $benefitSemesterHeadquarter["amount"];

				$amount += is_numeric($headquarterAmount)
					? (int) $headquarterAmount
					: 0;
			}
		}

		$this->merge([
			"total_headquarters_amount" => $amount,
		]);
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
				Rule::unique(BenefitSemester::class)
					->when($this->benefit_id, function (
						Unique $query,
						$benefitId,
					) {
						return $query->where("benefit_id", $benefitId);
					})
					->ignore($this->benefits_semester->id),
			],
			"amount" => "required|integer|min:1",
			"benefit_semester_headquarters.*.headquarter_id" => [
				"required",
				"integer",
				"distinct",
				"exists:headquarters,id",
			],
			"benefit_semester_headquarters.*.amount" => [
				"required",
				"integer",
				"min:1",
			],
			"benefit_semester_headquarters.*" => [
				function ($attribute, $current, $failure) {
					$id = isset($current["id"]) ? $current["id"] : null;
					$amount = isset($current["amount"])
						? $current["amount"]
						: null;

					$benefitSemesterHeadquarter =
						is_null($id) || !is_numeric($amount)
							? null
							: BenefitSemesterHeadquarter::find($id);

					if (is_null($benefitSemesterHeadquarter)) {
						return;
					}

					$studentsWithBenefit = $benefitSemesterHeadquarter
						->students()
						->count();

					if ($studentsWithBenefit > $amount) {
						$failure(
							$attribute . ".amount",
							"The amount can't be less than the current students with the benefit assigned ($studentsWithBenefit).",
						);
					}
				},
			],
			"total_headquarters_amount" => [
				Rule::requiredIf(fn() => is_numeric($this->amount)),
				"lte:" . $this->amount,
			],
		];
	}

	/**
	 * Get the error messages for the defined validation rules.
	 *
	 * @return array<string, string>
	 */
	public function messages(): array {
		return [
			"benefit_semester_headquarters.*.headquarter_id.required" =>
				"A headquarter is required.",
			"benefit_semester_headquarters.*.amount.required" =>
				"The amount is required.",
			"benefit_semester_headquarters.*.amount.integer" =>
				"The amount must be an integer.",
			"benefit_semester_headquarters.*.amount.min" =>
				"The amount must be greater than :min.",
		];
	}
}
