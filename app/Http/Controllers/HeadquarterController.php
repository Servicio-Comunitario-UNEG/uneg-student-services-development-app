<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
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
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get search queries.
		$search = $request->query("search", "");
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

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
				->when($search, function (Builder $query, string $search) {
					// Filter by name.
					$query->where("name", "like", "%$search%");
				})
				->orderByRaw("name COLLATE NOCASE ASC")
				->paginate($perPage),
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
			"filters" => [
				"search" => $search,
				"page" => $page,
				"per_page" => $perPage,
			],
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		$this->authorize("create", User::class);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		$this->authorize("create", User::class);

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
		$this->authorize("view", $headquarters);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Headquarter $headquarters) {
		$this->authorize("update", $headquarters);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Headquarter $headquarters) {
		$this->authorize("update", $headquarters);

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
	 * Unassigns the current representative.
	 */
	public function unassignRepresentative(Headquarter $headquarters) {
		$hasRepresentative = !is_null($headquarters->user?->id);

		if ($hasRepresentative) {
			$headquarters->user()->disassociate();
			$headquarters->save();
		}

		return redirect(route("headquarters.index"));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Headquarter $headquarters) {
		$this->authorize("delete", $headquarters);

		$headquarters->delete();

		return redirect(route("headquarters.index"));
	}
}
