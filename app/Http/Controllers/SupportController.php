<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupportRequest;
use App\Http\Requests\UpdateSupportRequest;
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
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get search queries.
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

		return Inertia::render("Supports/Index", [
			"supports" => Support::with([
				"student:id,first_name,last_name,identity_card",
				"user:id,name,identity_card",
			])
				->orderBy("date", "desc")
				->paginate($perPage),
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

		return Inertia::render("Supports/Edit", [
			"support" => $support,
			"students" => Student::all([
				"id",
				"first_name",
				"last_name",
				"identity_card",
			]),
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateSupportRequest $request, Support $support) {
		$support->update($request->validated());

		return redirect(route("supports.index"))->with(
			"message",
			"Apoyo editado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Support $support) {
		$this->authorize("delete", $support);

		$support->delete();

		return redirect(url()->previous())->with(
			"message",
			"Apoyo eliminado con éxito",
		);
	}
}
