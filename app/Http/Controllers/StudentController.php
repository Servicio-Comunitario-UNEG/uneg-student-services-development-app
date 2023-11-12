<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Utils;
use App\Models\Career;
use App\Models\Student;
use App\Models\User;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
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
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		$careers = Career::whereHas("headquarters")->get();

		/** @var Collection */
		$careersByHeadquarter = new Collection();

		foreach ($careers as $career) {
			foreach ($career->headquarters as $headquarter) {
				$careersByHeadquarter->push([
					"career" => $career->setVisible(["id", "name"]),
					"headquarter" => $headquarter->setVisible(["id", "name"]),
					"id" => $headquarter->academic_offer->id,
				]);
			}
		}

		return Inertia::render("Students/Create", [
			// The career that are given in any headquarter.
			"careers_by_headquarter" => $careersByHeadquarter,
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
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Student $student) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Student $student) {
		//
	}
}
