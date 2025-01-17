/**
 * The identity card which identifies a person.
 */
interface IdentityCard {
	nationality: "V" | "E";
	serial: string;
}

/**
 * The role an user can be assigned.
 */
export interface Role {
	name: "admin" | "coordinator" | "representative";
	description: string;
}

/**
 * An user of the system.
 */
export interface User {
	id: number;
	name: string;
	email: string;
	identity_card: IdentityCard;
	email_verified_at: string;
	current_role: Role;
	permission_names: string[];
}

/**
 * The navigation breadcrumb.
 */
export type Breadcrumb = {
	title: string;
	url: string;
	current?: boolean;
};

/**
 * The properties of a page.
 */
export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	breadcrumbs?: Breadcrumb[];
	auth: {
		user: User;
	};
	ziggy: {
		full_url: string;
	};
	flash: {
		message: string | null;
	};
};

/**
 * The structure of a paginated response.
 */
export type Paginated<T> = {
	current_page: number;
	data: T[];
	first_page_url: string;
	from: number | null;
	last_page: number;
	last_page_url: string;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number | null;
	total: number;
};

/**
 * A headquarter of the university.
 */
export interface Headquarter {
	id: number;
	city_id: number;
	name: string;
	created_at: string;
	updated_at: string;
	user_id: number | null;
}

/**
 * A career given in the university.
 */
export interface Career {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	headquarters_id: Headquarter["id"][];
}

/**
 * A career/headquarter pair.
 */
export interface CareerHeadquarter {
	id: number;
	career_id: number;
	headquarter_id: number;
}

/**
 * An student of the university.
 */
export interface Student {
	id: number;
	created_at: string;
	updated_at: string;
	career_headquarter_id: number | null;
	email: string;
	identity_card: IdentityCard;
	first_name: string;
	last_name: string;
	cell_phone: string;
	room_phone: string;
	sex: "M" | "F";
	birth_date: string;
	second_name: string | null;
	second_last_name: string | null;
	address: string | null;
	is_indigenous: boolean;
	is_disabled: boolean;
	scheduled_dining_room_use: number;
	graffar: number | null;
	socioeconomic_situation: string | null;
	ethnic: string | null;
	type_of_disability: string | null;
}

/**
 * A semester of the university.
 */
export interface Semester {
	id: number;
	created_at: string;
	updated_at: string;
	year: number;
	lapse: number;
	is_active: boolean;
}

/**
 * The services an student has received.
 */
export interface Service {
	id: number;
	created_at: string;
	updated_at: string;
	user_id: number;
	professional_id: number | null;
	student_id: number;
	date: string;
	type: "medical" | "psychosocial" | "economical";
	description: string;
}

/**
 * The benefits the univerisity offers.
 */
export interface Benefit {
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
}

/**
 * The relation between a benefit and a semester.
 */
export interface BenefitSemester {
	id: number;
	created_at: string;
	updated_at: string;
	benefit_id: number;
	semester_id: number;
	amount: number;
}

/**
 * The relation between a benefit in a semester in a headquarter.
 */
export interface BenefitSemesterHeadquarter {
	id: number;
	created_at: string;
	updated_at: string;
	benefit_semester_id: number;
	headquarter_id: number;
	amount: number;
}

/**
 * The city where is located a headquarter.
 */
export interface City {
	id: number;
	created_at: string;
	updated_at: string;
	name: string;
}
