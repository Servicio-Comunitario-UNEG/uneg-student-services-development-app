<?php

use App\Http\Controllers\CareerController;
use App\Http\Controllers\HeadquarterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/", function () {
	return Inertia::render("Welcome", [
		"canLogin" => Route::has("login"),
		"canRegister" => Route::has("register"),
		"laravelVersion" => Application::VERSION,
		"phpVersion" => PHP_VERSION,
	]);
});

Route::get("/dashboard", function () {
	return Inertia::render("Dashboard");
})
	->middleware(["auth", "verified"])
	->name("dashboard");

Route::middleware("auth")->group(function () {
	Route::get("/profile", [ProfileController::class, "edit"])->name(
		"profile.edit",
	);
	Route::patch("/profile", [ProfileController::class, "update"])->name(
		"profile.update",
	);
	Route::delete("/profile", [ProfileController::class, "destroy"])->name(
		"profile.destroy",
	);
});

// Users routes.
Route::resource("users", UserController::class)->only([
	"index",
	"store",
	"destroy",
	"update",
]);

// Headquarters routes.
Route::resource("headquarters", HeadquarterController::class)->only([
	"index",
	"store",
	"destroy",
	"update",
]);

Route::put("/headquarter/{headquarters}/unassign", [
	HeadquarterController::class,
	"unassignRepresentative",
])->name("headquarters.unassign");

// Careers routes.
Route::resource("careers", CareerController::class)
	->only(["index", "store", "destroy", "update"])
	->middleware(["auth", "verified"]);

// Students routes.
Route::resource("students", StudentController::class)->only(["index", "store"]);

require __DIR__ . "/auth.php";
