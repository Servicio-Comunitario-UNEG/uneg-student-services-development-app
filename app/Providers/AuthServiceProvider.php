<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Career;
use App\Models\Headquarter;
use App\Models\Student;
use App\Models\User;
use App\Policies\CareerPolicy;
use App\Policies\HeadquarterPolicy;
use App\Policies\StudentPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {
	/**
	 * The model to policy mappings for the application.
	 *
	 * @var array<class-string, class-string>
	 */
	protected $policies = [
		User::class => UserPolicy::class,
		Headquarter::class => HeadquarterPolicy::class,
		Career::class => CareerPolicy::class,
		Student::class => StudentPolicy::class,
	];

	/**
	 * Register any authentication / authorization services.
	 */
	public function boot(): void {
		//
	}
}
