<?php

namespace App\Http\Controllers;

use App\Models\Headquarter;
use App\Models\User;
use Hash;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller {
	public function __construct() {
		$this->middleware(["auth", "verified"]);
	}

	/**
	 * Returns the identity card from the nationality and serial.
	 */
	private function toIdentityCard(array $identity_card): string {
		$nationality =
			key_exists("nationality", $identity_card) &&
			is_string($identity_card["nationality"])
				? $identity_card["nationality"]
				: "";

		$serial =
			key_exists("serial", $identity_card) &&
			is_string($identity_card["serial"])
				? $identity_card["serial"]
				: "";

		return $nationality . $serial;
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		/** @var User */
		$user = $request->user();

		// Get the roles the user can assign.
		$assignableRoles = [];

		if ($user->hasPermissionTo("create users")) {
			$assignableRoles = Role::all();
		}

		if ($user->hasPermissionTo("create non admin users")) {
			$assignableRoles = Role::where("name", "!=", "admin")->get();
		}

		// Get the search queries.
		$search = $request->query("search", "");
		$selectedRoles = $request->query("roles", []);

		// Get all users.
		$users = User::query()
			->when($search, function (Builder $query, string $search) {
				// Filter by name and email.
				$query
					->where("name", "like", "%$search%")
					->orWhere("email", "like", "%$search%");
			})
			->orderBy("name")
			->get()
			->except($user->id);

		if (!empty($selectedRoles)) {
			$users = $users
				->filter(
					fn(User $user) => in_array(
						$user->role->name,
						$selectedRoles,
					),
				)
				->values();
		}

		return Inertia::render("Users/Index", [
			"users" => $users,
			"roles" => Role::all(),
			"assignableRoles" => $assignableRoles,
			"filters" => [
				"search" => $search,
				"roles" => $selectedRoles,
			],
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create() {
		$this->authorize("create", User::class);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(Request $request) {
		$this->authorize("create", User::class);

		// Set the generated identity card.
		$data = $request->all();
		$data["identity_card"] = $this->toIdentityCard($data["identity_card"]);
		$request->merge($data);

		$validated = $request->validate([
			"name" => "required|string|max:255",
			"email" => "required|string|email|max:255|unique:" . User::class,
			"identity_card" => [
				"required",
				"string",
				"regex:/^(V|E){1,1}\d+$/",
				"unique:" . User::class,
			],
			"password" => ["required", Rules\Password::defaults()],
			"role_name" => "required|exists:roles,name",
		]);

		// Create the user and assign its role.
		$user = User::create([
			"name" => $validated["name"],
			"email" => $validated["email"],
			"password" => Hash::make($validated["password"]),
			"identity_card" => $validated["identity_card"],
		]);

		$user->assignRole($validated["role_name"]);

		return redirect(route("users.index"));
	}

	/**
	 * Display the specified resource.
	 */
	public function show(User $user) {
		$this->authorize("view", $user);
	}

	/**
	 * Show the form for editing the specified resource.
	 */
	public function edit(User $user) {
		$this->authorize("update", $user);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(Request $request, User $user) {
		$this->authorize("update", $user);

		// Set the generated identity card.
		$data = $request->all();
		$data["identity_card"] = $this->toIdentityCard($data["identity_card"]);
		$request->merge($data);

		$validated = $request->validate([
			"name" => "required|string|max:255",
			"email" => [
				"required",
				"string",
				"email",
				"max:255",
				Rule::unique(User::class)->ignore($user->id),
			],
			"identity_card" => [
				"required",
				"string",
				"regex:/^(V|E){1,1}\d+$/",
				Rule::unique(User::class)->ignore($user->id),
			],
			"role_name" => "required|exists:roles,name",
		]);

		// Update the user and sync the roles.
		$user->update([
			"name" => $validated["name"],
			"email" => $validated["email"],
			"identity_card" => $validated["identity_card"],
		]);

		$user->syncRoles([$validated["role_name"]]);

		return redirect(route("users.index"));
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Request $request, User $user) {
		$this->authorize("delete", $user);

		$user->delete();

		return redirect(route("users.index"));
	}
}
