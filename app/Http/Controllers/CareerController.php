<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCareerRequest;
use App\Http\Requests\UpdateCareerRequest;
use App\Models\Career;
use App\Models\Headquarter;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get the search queries.
		$search = $request->query("search", "");
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

		return Inertia::render("Careers/Index", [
			"careers" => Career::query()
				->when($search, function (Builder $query, string $search) {
					// Filter by name.
					$query->where("name", "like", "%$search%");
				})
				->orderByRaw("name COLLATE NOCASE ASC")
				->paginate($perPage)
				->withQueryString(),
			"headquarters" => Headquarter::all(["id", "name"]),
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
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreCareerRequest $request) {
		$validated = $request->validated();

		$career = Career::create(["name" => $validated["name"]]);
		$career->headquarters()->attach($validated["headquarters_id"]);

		return redirect(url()->previous())->with(
			"message",
			"Carrera creada con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Career $career) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Career $career) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateCareerRequest $request, Career $career) {
		$validated = $request->validated();

		$career->update(["name" => $validated["name"]]);
		$career->headquarters()->sync($validated["headquarters_id"]);

		return redirect(url()->previous())->with(
			"message",
			"Carrera editada con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Career $career) {
		$this->authorize("delete", $career);

		$career->delete();

		return redirect(url()->previous())->with(
			"message",
			"Carrera eliminada con éxito",
		);
	}
}
