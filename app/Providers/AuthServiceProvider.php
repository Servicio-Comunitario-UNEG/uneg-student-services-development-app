<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Headquarter;
use App\Models\User;
use App\Policies\HeadquarterPolicy;
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
	];

	/**
	 * Register any authentication / authorization services.
	 */
	public function boot(): void {
		//
	}
}
