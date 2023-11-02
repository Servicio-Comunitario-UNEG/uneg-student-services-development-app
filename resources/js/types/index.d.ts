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
 * The properties of a page.
 */
export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
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
}

/**
 * An student of the university.
 */
export interface Student {
	id: number;
	created_at: string;
	updated_at: string;
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
}

/**
 * The socioeconomic state that an student has.
 */
export interface SocioeconomicState {
	id: number;
	created_at: string;
	updated_at: string;
	student_id: number;
	is_indigenous: boolean;
	is_disabled: boolean;
	graffar: number | null;
	description: string | null;
}
