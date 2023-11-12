<?php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
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
