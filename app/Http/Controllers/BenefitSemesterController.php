<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBenefitSemesterRequest;
use App\Models\Benefit;
use App\Models\BenefitSemester;
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
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreBenefitSemesterRequest $request) {
		BenefitSemester::create($request->validated());

		return redirect(route("benefits-semesters.index"))->with(
			"message",
			"Beneficio ha sido asignado al semestre con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(BenefitSemester $benefitSemester) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(BenefitSemester $benefitSemester) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, BenefitSemester $benefitSemester) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(BenefitSemester $benefitSemester) {
		//
	}
}
