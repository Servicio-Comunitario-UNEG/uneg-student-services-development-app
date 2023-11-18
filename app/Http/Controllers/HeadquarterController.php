<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHeadquarterRequest;
use App\Http\Requests\UpdateHeadquarterRequest;
use App\Models\Headquarter;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
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

		return Inertia::render("Headquarters/Index", [
			"headquarters" => Headquarter::with("user:id,name,identity_card")
				->when($search, function (Builder $query, string $search) {
					// Filter by name.
					$query->where("name", "like", "%$search%");
				})
				->orderByRaw("name COLLATE NOCASE ASC")
				->paginate($perPage),
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

		return Inertia::render("Headquarters/Create", [
			// Get the available representatives.
			"representatives" => User::role("representative")
				->doesntHave("headquarter")
				->orderBy("name")
				->get()
				->transform(function (User $user) {
					return [
						"id" => $user->id,
						"name" => $user->name,
						"identity_card" => $user->identity_card,
					];
				}),
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreHeadquarterRequest $request) {
		Headquarter::create($request->validated());

		return redirect(route("headquarters.index"))->with(
			"message",
			"Sede creada con éxito",
		);
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

		return Inertia::render("Headquarters/Edit", [
			// Get the available representatives and the current
			// headquarter's representative.
			"representatives" => User::role("representative")
				->where(function (Builder $query) use ($headquarters) {
					if (is_null($headquarters->user)) {
						return $query->doesntHave("headquarter");
					}

					$query
						->doesntHave("headquarter", "or")
						->orWhere("id", "=", $headquarters->user->id);
				})
				->orderBy("name")
				->get(),
			"headquarter" => $headquarters,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(
		UpdateHeadquarterRequest $request,
		Headquarter $headquarters,
	) {
		$headquarters->update($request->validated());

		return redirect(route("headquarters.index"))->with(
			"message",
			"Sede editada con éxito",
		);
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

		return redirect(url()->previous())->with(
			"message",
			"Representante desasignado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Headquarter $headquarters) {
		$this->authorize("delete", $headquarters);

		$headquarters->delete();

		return redirect(url()->previous())->with(
			"message",
			"Sede eliminada con éxito",
		);
	}
}
