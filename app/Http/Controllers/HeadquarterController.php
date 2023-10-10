<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class HeadquarterController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		return Inertia::render("Headquarters/Index", [
			"headquarters" => Headquarter::orderBy("name")->get(),
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
		$validated = $request->validate([
			"name" => "required|string|unique:headquarters|max:255",
		]);

		Headquarter::create($validated);

		return redirect(route("headquarters.index"));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Headquarter $headquarter) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Headquarter $headquarter) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, int $id) {
		$validated = $request->validate([
			"name" => [
				"required",
				"string",
				Rule::unique("headquarters")->ignore($id),
				"max:255",
			],
		]);

		$headquarter = Headquarter::find($id);

		if ($headquarter instanceof Headquarter) {
			$headquarter->update($validated);
		}

		return redirect(route("headquarters.index"));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(int $id) {
		Headquarter::destroy($id);

		return redirect(route("headquarters.index"));
	}
}
