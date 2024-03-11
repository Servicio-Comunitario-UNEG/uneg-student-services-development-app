<?php

namespace App\Http\Requests;

use App\Http\Utils;
use App\Models\Student;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudentRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("create", User::class);
	}

	/**
	 * Prepare the data for validation.
	 */
	protected function prepareForValidation(): void {
		$this->merge([
			"identity_card" => Utils::toIdentityCardString(
				$this->identity_card,
			),
		]);
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
	 */
	public function rules(): array {
		return [
			"email" => "required|string|email|max:255|unique:" . Student::class,
			"identity_card" => [
				"required",
				"string",
				"regex:/^(V|E){1,1}\d+$/",
				"unique:" . Student::class,
			],
			"career_headquarter_id" =>
				"required|integer|exists:career_headquarter,id",
			"first_name" => "required|string|max:255",
			"last_name" => "required|string|max:255",
			"cell_phone" => "required|string|min:10",
			"sex" => "in:M,F",
			"birth_date" =>
				"required|date|before_or_equal:" .
				Utils::getMaximumEnrollableBirthDate(),
			"is_indigenous" => "required|boolean",
			"is_disabled" => "required|boolean",
			"scheduled_dining_room_use" => "nullable|integer|min:0|max:5",
			"second_name" => "nullable|string|max:255",
			"second_last_name" => "nullable|string|max:255",
			"room_phone" => "nullable|string|min:10",
			"address" => "nullable|string|max:255",
			"graffar" => "nullable|integer|min:1|max:5",
			"socioeconomic_situation" => "nullable|string|max:255",
			"ethnic" =>
				"required_if_accepted:is_indigenous|nullable|string|max:255",
			"type_of_disability" =>
				"required_if_accepted:is_disabled|nullable|string|max:255",
		];
	}
}
