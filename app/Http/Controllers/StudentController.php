<?php

namespace App\Http\Controllers;

use App\Http\Traits\IdentityCardTrait;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller {
	use IdentityCardTrait;

	public function __construct() {
		$this->middleware(["auth", "verified"]);
	}

	/**
	 * Returns in Y-m-d format the maximum date
	 * allowed for birth date.
	 */
	private function getMaxBirthDate(): string {
		return (new \DateTime("now - 16 year"))->format("Y-m-d");
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		return Inertia::render("Students/Index", [
			"max_birth_date" => $this->getMaxBirthDate(),
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
		// Set the generated identity card.
		$data = $request->all();
		$data["identity_card"] = $this->toIdentityCardString(
			$data["identity_card"],
		);
		$request->merge($data);

		$validated = $request->validate([
			"email" => "required|string|email|max:255|unique:" . Student::class,
			"identity_card" => [
				"required",
				"string",
				"regex:/^(V|E){1,1}\d+$/",
				"unique:" . Student::class,
			],
			"first_name" => "required|string|max:255",
			"last_name" => "required|string|max:255",
			"cell_phone" => "required|string|min:10",
			"sex" => "in:M,F",
			"birth_date" =>
				"required|date|before_or_equal:" . $this->getMaxBirthDate(),
			"is_indigenous" => "required|boolean",
			"is_disabled" => "required|boolean",
			"second_name" => "nullable|string|max:255",
			"second_last_name" => "nullable|string|max:255",
			"room_phone" => "nullable|string|min:10",
			"address" => "nullable|string|max:255",
			"graffar" => "nullable|integer|min:1|max:5",
			"socioeconomic_situation" => "nullable|string|max:255",
		]);

		// Create the student.
		Student::create($validated);

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
