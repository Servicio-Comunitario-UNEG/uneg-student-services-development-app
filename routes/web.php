<?php

use App\Http\Controllers\BenefitController;
use App\Http\Controllers\BenefitSemesterController;
use App\Http\Controllers\BenefitSemesterHeadquarterController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\HeadquarterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
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

Route::get("/", fn() => redirect("/login"));

Route::get("/home", function () {
	return Inertia::render("Home");
})
	->middleware(["auth", "verified"])
	->name("home");

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
	"create",
	"store",
	"edit",
	"destroy",
	"update",
]);

// Headquarters routes.
Route::resource("headquarters", HeadquarterController::class)->only([
	"index",
	"create",
	"store",
	"edit",
	"destroy",
	"update",
]);

Route::put("/headquarter/{headquarters}/unassign", [
	HeadquarterController::class,
	"unassignRepresentative",
])->name("headquarters.unassign");

// Careers routes.
Route::resource("careers", CareerController::class)
	->only(["index", "store", "destroy", "update", "create", "edit", "show"])
	->middleware(["auth", "verified"]);

// Students routes.
Route::resource("students", StudentController::class)->only([
	"index",
	"create",
	"store",
	"update",
	"edit",
	"destroy",
	"show",
]);

// Semesters routes.
Route::resource("semesters", SemesterController::class)->only([
	"index",
	"create",
	"store",
	"edit",
	"update",
	"destroy",
]);

Route::put("/semesters/{semester}/activate", [
	SemesterController::class,
	"activate",
])->name("semesters.activate");

// Services routes.
Route::resource("services", ServiceController::class)->only([
	"index",
	"create",
	"store",
	"edit",
	"update",
	"destroy",
	"show",
]);

// Benefits routes.
Route::resource("benefits", BenefitController::class)->only([
	"index",
	"create",
	"store",
	"edit",
	"update",
	"destroy",
]);

// Benefits Semesters routes.
Route::resource("benefits-semesters", BenefitSemesterController::class)->only([
	"index",
	"create",
	"store",
	"edit",
	"update",
	"destroy",
	"show",
]);

// Benefits by student routes.
Route::resource(
	"benefits-headquarters",
	BenefitSemesterHeadquarterController::class,
)->only(["index"]);

Route::post("/benefits-headquarters/{benefitSemesterHeadquarter}", [
	BenefitSemesterHeadquarterController::class,
	"toggle",
])->name("benefits-headquarters.toggle");

require __DIR__ . "/auth.php";
