<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Utils;
use App\Models\Career;
use App\Models\CareerHeadquarter;
use App\Models\Student;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller {
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

		return Inertia::render("Students/Index", [
			"students" => Student::query()
				->when($search, function (Builder $query, string $search) {
					// Filter by name.
					$query
						->where("first_name", "like", "%$search%")
						->orWhere("second_name", "like", "%$search%")
						->orWhere("last_name", "like", "%$search%")
						->orWhere("second_last_name", "like", "%$search%")
						->orWhere("email", "like", "%$search%")
						->orWhere("identity_card", "like", "%$search%");
				})
				->orderByRaw("first_name COLLATE NOCASE ASC")
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

		return Inertia::render("Students/Create", [
			"career_by_headquarter" => CareerHeadquarter::with([
				"career:id,name",
				"headquarter:id,name",
			])->get(),
			"maximum_enrollable_birth_date" => Utils::getMaximumEnrollableBirthDate(),
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreStudentRequest $request) {
		// Create the student.
		Student::create($request->validated());

		return redirect(route("students.index"))->with(
			"message",
			"Estudiante creado con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Student $student) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Student $student) {
		$this->authorize("update", $student);

		return Inertia::render("Students/Edit", [
			"student" => $student,
			"career_by_headquarter" => CareerHeadquarter::with([
				"career:id,name",
				"headquarter:id,name",
			])->get(),
			"maximum_enrollable_birth_date" => Utils::getMaximumEnrollableBirthDate(),
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateStudentRequest $request, Student $student) {
		$student->update($request->validated());

		return redirect(route("students.index"))->with(
			"message",
			"Estudiante editado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Student $student) {
		$this->authorize("delete", $student);

		$student->delete();

		return redirect(url()->previous())->with(
			"message",
			"Estudiante eliminado con éxito",
		);
	}
}
