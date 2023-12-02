<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSemesterRequest;
use App\Http\Requests\UpdateSemesterRequest;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SemesterController extends Controller {
	public function __construct() {
		$this->middleware(["auth", "verified"]);
	}

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
			"semesters" => Semester::orderBy("year", "desc")->paginate(
				$perPage,
			),
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
		$this->authorize("update", $semester);

		return Inertia::render("Semesters/Edit", [
			"semester" => $semester,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateSemesterRequest $request, Semester $semester) {
		$semester->update($request->validated());

		return redirect(route("semesters.index"))->with(
			"message",
			"Semestre editado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Semester $semester) {
		$this->authorize("delete", $semester);

		$semester->delete();

		return redirect(url()->previous())->with(
			"message",
			"Semestre eliminado con éxito",
		);
	}

	/**
	 * Set semester as active.
	 */
	public function activate(Semester $semester) {
		Semester::where("is_active", true)->update([
			"is_active" => false,
		]);

		$semester->update(["is_active" => true]);

		return redirect(url()->previous())->with(
			"message",
			"Semestre ha sido establecido como activo",
		);
	}
}
