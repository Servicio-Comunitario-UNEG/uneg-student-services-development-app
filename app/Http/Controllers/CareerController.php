<?php

namespace App\Http\Controllers;

use App\Models\Career;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CareerController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		return Inertia::render("Careers/Index", [
			"careers" => Career::orderBy("name")->get(),
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

		Career::create($validated);

		return redirect(route("careers.index"));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(Career $career) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(Career $career) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, Career $career) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Career $career) {
		//
	}
}
