<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateServiceRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("update", $this->service);
	}

	/**
	 * Prepare the data for validation.
	 */
	protected function prepareForValidation(): void {
		$this->merge([
			"professional_id" =>
				$this->type !== "economical" ? $this->professional_id : null,
		]);
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
	 */
	public function rules(): array {
		return [
			"date" =>
				"required|date|before_or_equal:" .
				(new \DateTime("now"))->format("Y-m-d"),
			"professional_id" => [
				Rule::requiredIf($this->type != "economical"),
				"nullable",
				"integer",
				"exists:users,id",
			],
			"student_id" => "required|integer|exists:students,id",
			"description" => "required|string|min:1|max:255",
			"type" => "in:medical,psychosocial,economical",
		];
	}
}
