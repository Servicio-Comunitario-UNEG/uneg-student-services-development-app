<?php

namespace App\Http\Controllers;

use App\Models\BenefitSemester;
use App\Models\BenefitSemesterHeadquarter;
use App\Models\BenefitSemesterHeadquarterStudent;
use App\Models\Headquarter;
use App\Models\Semester;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
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
				: Student::with("benefits")
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
}
