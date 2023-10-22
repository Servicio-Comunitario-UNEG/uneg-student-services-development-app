<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HeadquarterController extends Controller {
	public function __construct() {
		$this->middleware(["auth", "verified"]);
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		// Get the unavailable representatives.
		$unavailableRepresentativeIds = Headquarter::all()
			->reject(
				fn(Headquarter $headquarters) => is_null($headquarters->user),
			)
			->pluck("user_id")
			->values()
			->all();

		return Inertia::render("Headquarters/Index", [
			"headquarters" => Headquarter::with("user:id,name,identity_card")
				->orderBy("name")
				->get(),
			"representatives" => User::role("representative")
				->orderBy("name")
				->get()
				->transform(function (User $user) use (
					$unavailableRepresentativeIds,
				) {
					return [
						"id" => $user->id,
						"name" => $user->name,
						"identity_card" => $user->identity_card,
						"is_available" => !in_array(
							$user->id,
							$unavailableRepresentativeIds,
						),
					];
				}),
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		//
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		$validated = $request->validate([
			"name" => "required|string|unique:headquarters|max:255",
			"user_id" => "nullable|numeric|exists:users,id|unique:headquarters",
		]);

		Headquarter::create($validated);

		return redirect(route("headquarters.index"));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Headquarter $headquarters) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Headquarter $headquarters) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Headquarter $headquarters) {
		$userId = $headquarters->user?->id;

		$validated = $request->validate([
			"name" => [
				"required",
				"string",
				Rule::unique("headquarters")->ignore($headquarters->id),
				"max:255",
			],
			"user_id" => is_null($userId)
				? [
					"nullable",
					"numeric",
					"exists:users,id",
					"unique:headquarters",
				]
				: [
					"nullable",
					"numeric",
					"exists:users,id",
					Rule::unique("headquarters")->ignore($userId, "user_id"),
				],
		]);

		$headquarters->update($validated);

		return redirect(route("headquarters.index"));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Headquarter $headquarters) {
		$headquarters->delete();

		return redirect(route("headquarters.index"));
	}
}
