<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Utils;
use App\Models\Career;
use App\Models\CareerHeadquarter;
use App\Models\Headquarter;
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
		$selectedCareers = $request->query("careers", []);
		$selectedHeadquarters = $request->query("headquarters", []);
		$isSeniorOnly = filter_var(
			$request->query("is_senior_only", false),
			FILTER_VALIDATE_BOOLEAN,
		);
		$isDisabledOnly = filter_var(
			$request->query("is_disabled_only", false),
			FILTER_VALIDATE_BOOLEAN,
		);
		$sex = $request->query("sex", []);
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
			"students" => Student::with(
				"career_headquarter.career",
				"career_headquarter.headquarter",
			)
				->when($isDisabledOnly, function (
					Builder $query,
					bool $isDisabledOnly,
				) {
					// Filter by age.
					$query->where("is_disabled", "=", true);
				})
				->when($isSeniorOnly, function (
					Builder $query,
					bool $isSeniorOnly,
				) {
					// Filter by age.
					$query->whereRaw(
						"DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(), birth_date)), '%Y') + 0 > ?",
						[60],
					);
				})
				->when($sex, function (Builder $query, array $sex) {
					// Filter by sex.
					$query->whereIn("sex", $sex);
				})
				->when($selectedCareers, function (
					Builder $query,
					array $selectedCareers,
				) {
					// Filter by career.
					$query->whereHas(
						"career_headquarter",
						fn(Builder $query) => $query->whereIn(
							"career_id",
							$selectedCareers,
						),
					);
				})
				->when($selectedHeadquarters, function (
					Builder $query,
					array $selectedHeadquarters,
				) {
					// Filter by headquarter.
					$query->whereHas(
						"career_headquarter",
						fn(Builder $query) => $query->whereIn(
							"headquarter_id",
							$selectedHeadquarters,
						),
					);
				})
				->when($search, function (Builder $query, string $search) {
					// Filter by full name, email or identity card.
					$query
						->where("first_name", "like", "%$search%")
						->orWhere("second_name", "like", "%$search%")
						->orWhere("last_name", "like", "%$search%")
						->orWhere("second_last_name", "like", "%$search%")
						->orWhere("email", "like", "%$search%")
						->orWhere("identity_card", "like", "%$search%");
				})
				->orderByRaw("UPPER(first_name)")
				->paginate($perPage),
			"careers" => Career::query()
				->orderByRaw("UPPER(name)")
				->get(),
			"headquarters" => Headquarter::query()
				->orderByRaw("UPPER(name)")
				->get(["id", "name"]),
			"filters" => [
				"careers" => $selectedCareers,
				"headquarters" => $selectedHeadquarters,
				"search" => $search,
				"page" => $page,
				"per_page" => $perPage,
				"is_senior_only" => $isSeniorOnly,
				"is_disabled_only" => $isDisabledOnly,
				"sex" => $sex,
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
		$this->authorize("view", $student);

		return Inertia::render("Students/Student", [
			"student" => $student->load([
				"career_headquarter.career",
				"career_headquarter.headquarter",
			]),
		]);
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
