<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CareerController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
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
		return Inertia::render("Careers/Create");
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		$validated = $request->validate([
			"name" => "required|string|unique:headquarters|max:255",
		]);

		Career::create($validated);

		return redirect(route("careers.index"))->with(
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
		return Inertia::render("Careers/Edit", [
			"career" => $career,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Career $career) {
		$validated = $request->validate([
			"name" => [
				"required",
				"string",
				Rule::unique("careers")->ignore($career->id),
				"max:255",
			],
		]);

		$career->update($validated);

		return redirect(route("careers.index"))->with(
			"message",
			"Carrera editada con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Career $career) {
		$career->delete();

		return redirect(url()->previous())->with(
			"message",
			"Carrera eliminada con éxito",
		);
	}
}
