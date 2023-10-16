export interface User {
	id: number;
	name: string;
	email: string;
	identity_card: {
		nationality: "V" | "E";
		serial: string;
	};
	email_verified_at: string;
	role: Role;
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
}

export interface Career {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
}

export interface Role {
	id: number;
	name: "admin" | "coordinator" | "representative";
	description: string;
}
