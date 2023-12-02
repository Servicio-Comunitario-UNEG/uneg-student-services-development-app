<?php

namespace App\Http\Requests;

use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreSupportRequest extends FormRequest {
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
			"date" =>
				"required|date|before_or_equal:" .
				(new \DateTime("now"))->format("Y-m-d"),
			"student_id" => "required|integer|exists:students,id",
			"description" => "required|string|min:1|max:255",
			"type" => "in:medical,psychological",
		];
	}
}
