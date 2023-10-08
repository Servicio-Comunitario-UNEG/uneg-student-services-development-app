<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HeadquarterController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index() {
		return Inertia::render("Headquarters/Index");
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
	public function update(Request $request, Headquarter $headquarter) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Headquarter $headquarter) {
		//
	}
}
