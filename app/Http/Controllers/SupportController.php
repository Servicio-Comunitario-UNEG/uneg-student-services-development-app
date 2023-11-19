<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupportRequest;
use App\Models\Student;
use App\Models\Support;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller {
	public function __construct() {
		$this->middleware(["auth", "verified"]);
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		$this->authorize("viewAny", User::class);

		return Inertia::render("Supports/Index");
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		$this->authorize("create", User::class);

		return Inertia::render("Supports/Create", [
			"students" => Student::all([
				"id",
				"first_name",
				"last_name",
				"identity_card",
			]),
		]);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreSupportRequest $request) {
		$request
			->user()
			->supports()
			->create($request->validated());

		return redirect(route("supports.index"))->with(
			"message",
			"Apoyo creado con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Support $support) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Support $support) {
		$this->authorize("update", $support);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Support $support) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Support $support) {
		$this->authorize("delete", $support);
	}
}
