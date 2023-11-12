<?php

// Note: Laravel will automatically resolve `Breadcrumbs::` without
// this import. This is nice for IDE syntax and refactoring.
use Diglactic\Breadcrumbs\Breadcrumbs;

// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Users
Breadcrumbs::for("users.index", function (BreadcrumbTrail $trail) {
	$trail->push("Usuarios", route("users.index"));
});

// Users > Create
Breadcrumbs::for("users.create", function (BreadcrumbTrail $trail) {
	$trail->parent("users.index");
	$trail->push("Crear", route("users.create"));
});
