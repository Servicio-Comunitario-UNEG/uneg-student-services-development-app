<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\Benefit;
use App\Models\BenefitSemester;
use App\Models\BenefitSemesterHeadquarter;
use App\Models\BenefitSemesterHeadquarterStudent;
use App\Models\Career;
use App\Models\Headquarter;
use App\Models\Student;
use App\Models\Support;
use App\Models\User;
use App\Policies\BenefitPolicy;
use App\Policies\BenefitSemesterHeadquarterPolicy;
use App\Policies\BenefitSemesterHeadquarterStudentPolicy;
use App\Policies\BenefitSemesterPolicy;
use App\Policies\CareerPolicy;
use App\Policies\HeadquarterPolicy;
use App\Policies\StudentPolicy;
use App\Policies\SupportPolicy;
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
		Support::class => SupportPolicy::class,
		Benefit::class => BenefitPolicy::class,
		BenefitSemester::class => BenefitSemesterPolicy::class,
		BenefitSemesterHeadquarter::class =>
			BenefitSemesterHeadquarterPolicy::class,
		BenefitSemesterHeadquarterStudent::class =>
			BenefitSemesterHeadquarterStudentPolicy::class,
	];

	/**
	 * Register any authentication / authorization services.
	 */
	public function boot(): void {
		//
	}
}
