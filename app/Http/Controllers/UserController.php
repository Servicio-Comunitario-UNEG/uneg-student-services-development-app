<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Hash;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller {
	public function __construct() {
		$this->middleware(["auth", "verified"]);
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
		$page = $request->query("page");
		$perPage = $request->query("per_page");

		if (is_null($page) || !is_numeric($page)) {
			$page = 1;
		}

		if (is_null($perPage) || !is_numeric($perPage)) {
			$perPage = 10;
		}

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
			"assignableRoles" => $assignableRoles,
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
	public function create() {
		$this->authorize("create", User::class);
	}

	/**
	 * Store a newly created resource in storage.
	 */
	public function store(StoreUserRequest $request) {
		$validated = $request->validated();

		// Create the user and assign its role.
		$user = User::create([
			"name" => $validated["name"],
			"email" => $validated["email"],
			"password" => Hash::make($validated["password"]),
			"identity_card" => $validated["identity_card"],
		]);

		$user->assignRole($validated["role_name"]);

		return redirect(url()->previous())->with(
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
	public function edit(User $user) {
		$this->authorize("update", $user);
	}

	/**
	 * Update the specified resource in storage.
	 */
	public function update(UpdateUserRequest $request, User $user) {
		// Update the user and sync the roles.
		$user->update($request->safe()->except(["role_name"]));
		$user->syncRoles([$request->validated("role_name")]);

		return redirect(url()->previous())->with(
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
