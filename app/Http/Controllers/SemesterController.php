<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSemesterRequest;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SemesterController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get search queries.
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

		return Inertia::render("Semesters/Index", [
			"semesters" => Semester::orderBy("year")->paginate($perPage),
			"filters" => [
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

		return Inertia::render("Semesters/Create");
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreSemesterRequest $request) {
		Semester::create($request->validated());

		return redirect(route("semesters.index"))->with(
			"message",
			"Semestre creado con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Semester $semester) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Semester $semester) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Semester $semester) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Semester $semester) {
		//
	}
}
