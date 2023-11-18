<?php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use App\Models\Career;
use App\Models\Headquarter;
use App\Models\Student;
use App\Models\User;
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

//* Users
Breadcrumbs::for("users.index", function (BreadcrumbTrail $trail) {
	$trail->push("Usuarios", route("users.index"));
});

// Users > Create
Breadcrumbs::for("users.create", function (BreadcrumbTrail $trail) {
	$trail->parent("users.index");
	$trail->push("Crear", route("users.create"));
});

// Users > Edit
Breadcrumbs::for("users.edit", function (BreadcrumbTrail $trail, User $user) {
	$trail->parent("users.index");
	$trail->push("Editar", route("users.edit", $user));
});

//* Headquarters
Breadcrumbs::for("headquarters.index", function (BreadcrumbTrail $trail) {
	$trail->push("Sedes", route("headquarters.index"));
});

// Headqaurters > Create
Breadcrumbs::for("headquarters.create", function (BreadcrumbTrail $trail) {
	$trail->parent("headquarters.index");
	$trail->push("Crear", route("headquarters.create"));
});

// Headqaurters > Edit
Breadcrumbs::for("headquarters.edit", function (
	BreadcrumbTrail $trail,
	Headquarter $headquarter,
) {
	$trail->parent("headquarters.index");
	$trail->push("Editar", route("headquarters.edit", $headquarter));
});

//* Careers
Breadcrumbs::for("careers.index", function (BreadcrumbTrail $trail) {
	$trail->push("Carreras", route("careers.index"));
});

// Careers > Create
Breadcrumbs::for("careers.create", function (BreadcrumbTrail $trail) {
	$trail->parent("careers.index");
	$trail->push("Crear", route("careers.create"));
});

// Careers > Edit
Breadcrumbs::for("careers.edit", function (
	BreadcrumbTrail $trail,
	Career $career,
) {
	$trail->parent("careers.index");
	$trail->push("Editar", route("careers.edit", $career));
});

//* Students
Breadcrumbs::for("students.index", function (BreadcrumbTrail $trail) {
	$trail->push("Estudiantes", route("students.index"));
});

// Students > Create
Breadcrumbs::for("students.create", function (BreadcrumbTrail $trail) {
	$trail->parent("students.index");
	$trail->push("Crear", route("students.create"));
});

// Students > Edit
Breadcrumbs::for("students.edit", function (
	BreadcrumbTrail $trail,
	Student $student,
) {
	$trail->parent("students.index");
	$trail->push("Editar", route("students.edit", $student));
});

// Students > Show
Breadcrumbs::for("students.show", function (
	BreadcrumbTrail $trail,
	Student $student,
) {
	$trail->parent("students.index");
	$trail->push("Estudiante", route("students.show", $student));
});

//* Semesters
Breadcrumbs::for("semesters.index", function (BreadcrumbTrail $trail) {
	$trail->push("Semestres", route("semesters.index"));
});

// Semesters > Create
Breadcrumbs::for("semesters.create", function (BreadcrumbTrail $trail) {
	$trail->parent("semesters.index");
	$trail->push("Crear", route("semesters.create"));
});
