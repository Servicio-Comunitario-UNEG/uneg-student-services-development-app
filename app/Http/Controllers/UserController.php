<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use App\Models\User;
use Hash;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller {
	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		/** @var User */
		$user = $request->user();

		// Get all users.
		$users = User::orderBy("name")
			->get()
			->except($request->user()->id);

		$users = $users->setVisible(["id", "name", "email", "role"]);

		// Get the roles the user can create.
		$roles = [];

		if ($user->hasPermissionTo("create users")) {
			$roles = Role::all();
		}

		if ($user->hasPermissionTo("create non admin users")) {
			$roles = Role::where("name", "!=", "admin")->get();
		}

		return Inertia::render("Users/Index", [
			"headquarters" => Headquarter::orderBy("name")->get(),
			"users" => $users,
			"roles" => $roles,
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
		]);

		// Create the user and assign its role.
		$user = User::create([
			"name" => $validated["name"],
			"email" => $validated["email"],
			"password" => Hash::make($validated["password"]),
		]);

		$user->assignRole($validated["role_name"]);

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
	public function destroy(Request $request, User $user) {
		/** @var User */
		$currentUser = $request->user();

		// Only delete if the user has the permission and it's not itself.
		if (
			$currentUser->hasPermissionTo("delete users") &&
			$currentUser->id != $user->id
		) {
			$user->delete();
		}

		return redirect(route("users.index"));
	}
}
