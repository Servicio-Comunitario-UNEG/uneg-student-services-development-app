<?php

namespace App\Http\Controllers;

use App\Models\Benefit;
use App\Models\BenefitSemester;
use App\Models\BenefitSemesterHeadquarter;
use App\Models\BenefitSemesterHeadquarterStudent;
use App\Models\Headquarter;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;

class BenefitSemesterHeadquarterStudentController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get search queries.
		$semester = $request->query("semester");
		$headquarter = $request->query("headquarter");
		$benefit = $request->query("benefit");
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (!is_numeric($page)) {
			$page = 1;
		}

		if (!is_numeric($perPage)) {
			$perPage = 10;
		}

		if (!is_numeric($semester)) {
			$semester = null;
		}

		if (!is_numeric($headquarter)) {
			$headquarter = null;
		}

		if (!is_numeric($benefit)) {
			$benefit = null;
		}

		// Get the benefits given in the semester selected.
		if ($semester != null) {
			$benefitSemesterIds = BenefitSemester::query()
				->where("semester_id", "=", $semester)
				->get()
				->pluck("id");
		}

		return Inertia::render("Benefits/Students/Index", [
			"semesters" => Semester::all()->sortByDesc("year"),
			"headquarters" => Headquarter::all()
				->sortBy("name")
				->values(),
			"benefits" =>
				is_null($semester) || is_null($headquarter)
					? []
					: BenefitSemesterHeadquarter::query()
						->whereIn("benefit_semester_id", $benefitSemesterIds)
						->where("headquarter_id", "=", $headquarter)
						->get()
						->load("benefit_semester.benefit"),
			"students" => is_null($headquarter)
				? new Paginator([], $perPage)
				: Student::with("benefits.benefit_semester.benefit")
					->whereHas(
						"career_headquarter",
						fn(Builder $query) => $query->where(
							"headquarter_id",
							"=",
							$headquarter,
						),
					)
					->paginate($perPage)
					->withQueryString(),
			"filters" => [
				"semester" => $semester,
				"headquarter" => $headquarter,
				"benefit" => $benefit,
			],
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
		//
	}

	/**
	 * Display the specified resource.
	 */
	public function show(
		BenefitSemesterHeadquarterStudent $benefitSemesterHeadquarterStudent,
	) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(
		BenefitSemesterHeadquarterStudent $benefitSemesterHeadquarterStudent,
	) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(
		Request $request,
		BenefitSemesterHeadquarterStudent $benefitSemesterHeadquarterStudent,
	) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(
		BenefitSemesterHeadquarterStudent $benefitSemesterHeadquarterStudent,
	) {
		//
	}

	/**
	 * Assign or unassign the benefit semester headquarter to a group of students.
	 */
	public function toggle(
		Request $request,
		BenefitSemesterHeadquarter $benefitSemesterHeadquarter,
	) {
		$selectedStudents = $request->json("selected", []);
		$unselectedStudents = $request->json("unselected", []);

		// Remove assignment.
		$benefitSemesterHeadquarter->students()->detach($unselectedStudents);

		// Take the maximum of assignments that can be made.
		$maxAssignable =
			$benefitSemesterHeadquarter->amount -
			$benefitSemesterHeadquarter->students()->count();

		// Avoid assignment as its completed.
		if ($maxAssignable <= 0) {
			return redirect(url()->previous())->with(
				"message",
				"El beneficio no puede ser asignado a más estudiantes",
			);
		}

		$selectedStudents =
			count($selectedStudents) > $maxAssignable
				? array_slice($selectedStudents, 0, $maxAssignable)
				: $selectedStudents;

		// Assign the benefits.
		$benefitSemesterHeadquarter->students()->sync($selectedStudents);

		return redirect(url()->previous())->with(
			"message",
			"Se han guardado los cambios con éxito",
		);
	}
}
