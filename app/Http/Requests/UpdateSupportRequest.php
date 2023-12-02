<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSupportRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("update", $this->support);
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
			"student_id" => "required|integer|exists:students,id",
			"description" => "required|string|min:1|max:255",
			"type" => "in:medical,psychological",
		];
	}
}
