export interface User {
	id: number;
	name: string;
	email: string;
	identity_card: {
		nationality: "V" | "E";
		serial: string;
	};
	email_verified_at: string;
	current_role: Role;
	permission_names: string[];
}

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
	};
};

export interface Headquarter {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	user_id: number;
}

export interface Career {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface Role {
	name: "admin" | "coordinator" | "representative";
	description: string;
}

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
