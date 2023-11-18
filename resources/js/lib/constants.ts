import {
	BarChart3,
	BookCopy,
	Building,
	Calendar,
	GraduationCap,
	LucideIcon,
	Users,
} from "lucide-react";

export const links: {
	title: string;
	to: string;
	permission?: string;
	isMobileOnly?: boolean;
	Icon?: LucideIcon;
	urlStartsWith?: string;
}[] = [
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
		title: "Perfil",
		to: "profile.edit",
		isMobileOnly: true,
	},
];
