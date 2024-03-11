import {
	BookCopy,
	Building,
	Calendar,
	GraduationCap,
	HeartHandshake,
	HelpingHand,
	LucideIcon,
	Users,
} from "lucide-react";

import { Service, Student } from "@/types";

export type MenuLink = {
	title: string;
	to: string;
	permission?: string;
	Icon?: LucideIcon;
	urlStartsWith?: string;
	sublinksParentTitle?: string;
	sublinks?: Omit<MenuLink, "sublinks">[];
};

/** The sex labels. */
export const sexLabel: {
	[key in Student["sex"]]: string;
} = {
	M: "Masculino",
	F: "Femenino",
};

/** The service type labels. */
export const serviceTypeLabel: {
	[key in Service["type"]]: string;
} = {
	medical: "Médico",
	economical: "Económico",
	psychosocial: "Psicosocial",
};

/**
 * The pages links when the user is authed.
 */
export const links: MenuLink[] = [
	{
		title: "Usuarios",
		permission: "view users",
		to: "users.index",
		Icon: Users,
		urlStartsWith: "/users",
	},
	{
		title: "Sedes",
		permission: "view headquarters",
		to: "headquarters.index",
		Icon: Building,
		urlStartsWith: "/headquarters",
	},
	{
		title: "Carreras",
		permission: "view careers",
		to: "careers.index",
		Icon: BookCopy,
		urlStartsWith: "/careers",
	},
	{
		title: "Estudiantes",
		permission: "view students",
		to: "students.index",
		Icon: GraduationCap,
		urlStartsWith: "/students",
	},
	{
		title: "Semestres",
		permission: "view semesters",
		to: "semesters.index",
		Icon: Calendar,
		urlStartsWith: "/semesters",
	},
	{
		title: "Servicios",
		permission: "view services",
		to: "services.index",
		Icon: HeartHandshake,
		urlStartsWith: "/services",
	},
	{
		title: "Beneficios",
		permission: "view benefits",
		to: "benefits.index",
		Icon: HelpingHand,
		urlStartsWith: "/benefits",
		sublinksParentTitle: "Todos",
		sublinks: [
			{
				title: "Por Semestre",
				permission: "view benefits",
				urlStartsWith: "/benefits-semesters",
				to: "benefits-semesters.index",
			},
			{
				title: "Por Estudiante",
				permission: "view benefits",
				urlStartsWith: "/benefits-headquarters",
				to: "benefits-headquarters.index",
			},
		],
	},
];
