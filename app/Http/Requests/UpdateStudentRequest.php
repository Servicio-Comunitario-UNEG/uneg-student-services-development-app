<?php

namespace App\Http\Requests;

use App\Http\Utils;
use App\Models\Student;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("update", $this->student);
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
			"email" => [
				"required",
				"string",
				"email",
				"max:255",
				Rule::unique(Student::class)->ignore($this->student->id),
			],
			"identity_card" => [
				"required",
				"string",
				"regex:/^(V|E){1,1}\d+$/",
				Rule::unique(Student::class)->ignore($this->student->id),
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
			"second_name" => "nullable|string|max:255",
			"second_last_name" => "nullable|string|max:255",
			"room_phone" => "nullable|string|min:10",
			"address" => "nullable|string|max:255",
			"graffar" => "nullable|integer|min:1|max:5",
			"socioeconomic_situation" => "nullable|string|max:255",
		];
	}
}