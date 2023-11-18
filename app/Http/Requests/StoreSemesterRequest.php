<?php

namespace App\Http\Requests;

use App\Models\Semester;
use App\Models\User;
use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;

class StoreSemesterRequest extends FormRequest {
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
			"year" => "required|digits:4|integer|min:1900|max:" . date("Y"),
			"lapse" => [
				"required",
				"integer",
				"min:1",
				"max:2",
				Rule::unique(Semester::class)->when($this->year, function (
					Unique $query,
					$year,
				) {
					return $query->where("year", $year);
				}),
			],
		];
	}
}
