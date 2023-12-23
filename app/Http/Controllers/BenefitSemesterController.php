<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBenefitSemesterRequest;
use App\Http\Requests\UpdateBenefitSemesterRequest;
use App\Models\Benefit;
use App\Models\BenefitSemester;
use App\Models\Headquarter;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BenefitSemesterController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get the search queries.
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

		return Inertia::render("Benefits/Semesters/Index", [
			"benefits_semesters" => BenefitSemester::with([
				"benefit",
				"semester",
			])->paginate($perPage),
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

		return Inertia::render("Benefits/Semesters/Create", [
			"benefits" => Benefit::all(),
			"semesters" => Semester::all(),
			"headquarters" => Headquarter::all(),
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreBenefitSemesterRequest $request) {
		/** @var BenefitSemester */
		$benefitSemester = BenefitSemester::create($request->validated());

		$benefitSemester
			->benefit_semester_headquarters()
			->createMany($request->validated("benefit_semester_headquarters"));

		return redirect(route("benefits-semesters.index"))->with(
			"message",
			"Beneficio ha sido asignado con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(BenefitSemester $benefits_semester) {
		$this->authorize("view", $benefits_semester);

		return Inertia::render("Benefits/Semesters/View", [
			"benefit_semester" => $benefits_semester->load([
				"benefit_semester_headquarters.headquarter",
				"benefit",
			]),
		]);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(BenefitSemester $benefits_semester) {
		$this->authorize("update", $benefits_semester);

		return Inertia::render("Benefits/Semesters/Edit", [
			"benefit_semester" => $benefits_semester->load(
				"benefit_semester_headquarters",
			),
			"benefits" => Benefit::all(),
			"semesters" => Semester::all(),
			"headquarters" => Headquarter::all(),
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(
		UpdateBenefitSemesterRequest $request,
		BenefitSemester $benefits_semester,
	) {
		$benefits_semester->update($request->validated());

		$headquartersToKeep = [];

		$benefitSemesterHeadquarters =
			$request["benefit_semester_headquarters"];

		// Keep the ids that remain.
		foreach ($benefitSemesterHeadquarters as $benefitSemesterHeadquarter) {
			array_push(
				$headquartersToKeep,
				$benefitSemesterHeadquarter["headquarter_id"],
			);
		}

		// Delete headquarters relation that weren't passed.
		$benefits_semester
			->benefit_semester_headquarters()
			->whereNotIn("headquarter_id", $headquartersToKeep)
			->delete();

		// Filter by update/create.
		$toUpdate = array_filter(
			$benefitSemesterHeadquarters,
			fn($value) => array_key_exists("id", $value),
		);

		$toCreate = array_filter(
			$benefitSemesterHeadquarters,
			fn($value) => !array_key_exists("id", $value),
		);

		// Update or create the relations.
		$benefits_semester
			->benefit_semester_headquarters()
			->upsert($toUpdate, "id");

		$benefits_semester
			->benefit_semester_headquarters()
			->createMany($toCreate);

		return redirect(route("benefits-semesters.index"))->with(
			"message",
			"Asignación de beneficio ha sido editado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(BenefitSemester $benefits_semester) {
		$this->authorize("delete", $benefits_semester);

		$benefits_semester->delete();

		return redirect(route("benefits-semesters.index"))->with(
			"message",
			"Beneficio ha sido desasignado al semestre",
		);
	}
}
