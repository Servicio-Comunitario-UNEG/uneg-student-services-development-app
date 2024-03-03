<?php

namespace App\Http\Requests;

use App\Models\Headquarter;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHeadquarterRequest extends FormRequest {
	/**
	 * Determine if the user is authorized to make this request.
	 */
	public function authorize(): bool {
		return Auth::user()->can("update", $this->headquarters);
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
	 */
	public function rules(): array {
		$userId = $this->headquarters->user?->id;

		return [
			"name" => [
				"required",
				"string",
				Rule::unique("headquarters")->ignore($this->headquarters->id),
				"max:255",
			],
			"city_id" => "required|numeric|exists:cities,id",
			"user_id" => array_merge([
				"nullable",
				"numeric",
				"exists:users,id",
				is_null($userId)
					? "unique:" . Headquarter::class
					: Rule::unique("headquarters")->ignore($userId, "user_id"),
			]),
		];
	}
}
