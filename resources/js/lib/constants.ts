import {
	BarChart3,
	BookCopy,
	Building,
	Calendar,
	GraduationCap,
	HeartHandshake,
	HelpingHand,
	LucideIcon,
	Users,
} from "lucide-react";

export type MobileLink = {
	title: string;
	to: string;
	permission?: string;
	isMobileOnly?: boolean;
	Icon?: LucideIcon;
	urlStartsWith?: string;
	sublinks?: Omit<MobileLink, "sublinks">[];
};

/**
 * The pages links when the user is authed.
 */
export const links: MobileLink[] = [
	{
		title: "Dashboard",
		to: "dashboard",
		Icon: BarChart3,
	},
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
		title: "Apoyos",
		permission: "view supports",
		to: "supports.index",
		Icon: HeartHandshake,
		urlStartsWith: "/supports",
	},
	{
		title: "Beneficios",
		permission: "view benefits",
		to: "benefits.index",
		Icon: HelpingHand,
		urlStartsWith: "/benefits",
		sublinks: [
			{
				title: "Por Semestre",
				permission: "view benefits",
				urlStartsWith: "/benefits-semesters",
				to: "benefits-semesters.index",
			},
		],
	},
	{
		title: "Perfil",
		to: "profile.edit",
		isMobileOnly: true,
	},
];
