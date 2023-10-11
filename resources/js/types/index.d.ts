export interface User {
	id: number;
	name: string;
	email: string;
	email_verified_at: string;
	role_name: "admin" | "coordinator" | "representative";
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
}

export interface Career {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}
