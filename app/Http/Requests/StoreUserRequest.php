<?php

namespace App\Http\Requests;

use App\Http\Utils;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class StoreUserRequest extends FormRequest {
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
			"name" => "required|string|max:255",
			"email" => "required|string|email|max:255|unique:" . User::class,
			"identity_card" => [
				"required",
				"string",
				"regex:/^(V|E){1,1}\d+$/",
				"unique:" . User::class,
			],
			"password" => ["required", Rules\Password::defaults()],
			"role_name" => "required|exists:roles,name",
		];
	}
}
