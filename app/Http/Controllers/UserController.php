<?php

namespace App\Http\Controllers;

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
	 * Returns the roles the user can assign
	 */
	private function getAssignableRoles(User $user) {
		// Get the roles the user can assign.
		$roles = [];

		if ($user->hasPermissionTo("create users")) {
			$roles = Role::all();
		}

		if ($user->hasPermissionTo("create non admin users")) {
			$roles = Role::where("name", "!=", "admin")->get();
		}

		return $roles;
	}

	/**
	 * Display a listing of the resource.
	 */
	public function index(Request $request) {
		$this->authorize("viewAny", User::class);

		// Get the search queries.
		$search = $request->query("search", "");
		$selectedRoles = $request->query("roles", []);
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

		/** @var User */
		$user = $request->user();

		// All users that match the queries.
		$users = User::query()
			->where("id", "!=", $user->id)
			->when($search, function (Builder $query, string $search) {
				$query->where(function (Builder $query) use ($search) {
					// Filter by name, email or identity card.
					$query
						->where("name", "like", "%$search%")
						->orWhere("email", "like", "%$search%")
						->orWhere("identity_card", "like", "%$search%");
				});
			})
			->when($selectedRoles, function (
				Builder $query,
				array $selectedRoles,
			) {
				// Filter by roles.
				$query->whereHas(
					"roles",
					fn(Builder $query) => $query->whereIn(
						"name",
						$selectedRoles,
					),
				);
			})
			->orderByRaw("name COLLATE NOCASE ASC")
			->paginate($perPage)
			->withQueryString();

		return Inertia::render("Users/Index", [
			"users" => $users,
			"roles" => Role::all(),
			"filters" => [
				"search" => $search,
				"roles" => $selectedRoles,
				"page" => $page,
				"per_page" => $perPage,
			],
		]);
	}

	/**
	 * Show the form for creating a new resource.
	 */
	public function create(Request $request) {
		$this->authorize("create", User::class);

		return Inertia::render("Users/Create", [
			"roles" => $this->getAssignableRoles($request->user()),
		]);
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

		return redirect(route("users.index"))->with(
			"message",
			"Usuario creado con éxito",
		);
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
	public function edit(Request $request, User $user) {
		$this->authorize("update", $user);

		return Inertia::render("Users/Edit", [
			"user" => $user,
			"roles" => $this->getAssignableRoles($request->user()),
		]);
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

		return redirect(route("users.index"))->with(
			"message",
			"Usuario editado con éxito",
		);
	}

	/**
	 * Remove the specified resource from storage.
	 */
	public function destroy(Request $request, User $user) {
		$this->authorize("delete", $user);

		$user->delete();

		return redirect(url()->previous())->with(
			"message",
			"Usuario eliminado con éxito",
		);
	}
}
