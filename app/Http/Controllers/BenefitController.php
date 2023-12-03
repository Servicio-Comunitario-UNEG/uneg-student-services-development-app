<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBenefitRequest;
use App\Http\Requests\UpdateBenefitRequest;
use App\Models\Benefit;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BenefitController extends Controller {
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

		return Inertia::render("Benefits/General/Index", [
			"benefits" => Benefit::query()->paginate($perPage),
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

		return Inertia::render("Benefits/General/Create");
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreBenefitRequest $request) {
		Benefit::create($request->validated());

		return redirect(route("benefits.index"))->with(
			"message",
			"Beneficio creado con éxito",
		);
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Benefit $benefit) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Benefit $benefit) {
		$this->authorize("update", $benefit);

		return Inertia::render("Benefits/General/Edit", [
			"benefit" => $benefit,
		]);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateBenefitRequest $request, Benefit $benefit) {
		$benefit->update($request->validated());

		return redirect(route("benefits.index"))->with(
			"message",
			"Beneficio editado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Benefit $benefit) {
		$this->authorize("delete", $benefit);

		$benefit->delete();

		return redirect(url()->previous())->with(
			"message",
			"Beneficio eliminado con éxito",
		);
	}
}
