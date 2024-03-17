<?php

namespace App\Http\Requests;

use App\Models\Headquarter;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;

class StoreHeadquarterRequest extends FormRequest {
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
			"name" => "required|string|max:255|unique:" . Headquarter::class,
			"city_id" => "required|numeric|exists:cities,id",
			"user_id" =>
				"nullable|numeric|exists:users,id|unique:" . Headquarter::class,
		];
	}
}
