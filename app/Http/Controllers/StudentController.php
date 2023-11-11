<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Utils;
use App\Models\Career;
use App\Models\Student;
use App\Models\User;
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
	public function index() {
		$this->authorize("viewAny", User::class);

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

		return Inertia::render("Students/Index", [
			// The career that are given in any headquarter.
			"careers_by_headquarter" => $careersByHeadquarter,
			"maximum_enrollable_birth_date" => Utils::getMaximumEnrollableBirthDate(),
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
	public function store(StoreStudentRequest $request) {
		// Create the student.
		Student::create($request->validated());

		return redirect(url()->previous())->with(
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
