<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use App\Models\User;
use Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		/** @var \Illuminate\Database\Eloquent\Collection */
		$users = User::orderBy("name")
			->get()
			->except($request->user()->id);

		$users = $users->setVisible(["id", "name", "email", "role_name"]);

		return Inertia::render("Users/Index", [
			"headquarters" => Headquarter::orderBy("name")->get(),
			"users" => $users,
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
			"name" => "required|string|max:255",
			"email" => "required|string|email|max:255|unique:" . User::class,
			"password" => ["required", Rules\Password::defaults()],
			"role_name" => "required|exists:roles,name",

			// Only when the user role is representative.
			"headquarter_id" => [
				"required_if:role_name,representative",
				"exists:headquarters,id",
			],
		]);

		// Create the user and assign its role.
		$user = User::create([
			"name" => $validated["name"],
			"email" => $validated["email"],
			"password" => Hash::make($validated["password"]),
		]);

		$user->assignRole($validated["role_name"]);

		// Update the headquarter representative.
		if ($validated["role_name"] == "representative") {
			$headquarter = Headquarter::find($validated["headquarter_id"]);

			$headquarter->update([
				"user_id" => $validated["headquarter_id"],
			]);
		}

		return redirect(route("users.index"));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(User $user) {
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user) {
		//
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, User $user) {
		//
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(User $user) {
		//
	}
}
