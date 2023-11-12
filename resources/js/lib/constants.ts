import {
	BarChart3,
	Building,
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
	},
	{
		title: "Sedes",
		permission: "view headquarters",
		to: "headquarters.index",
		Icon: Building,
	},
	{
		title: "Carreras",
		permission: "view careers",
		to: "careers.index",
		Icon: GraduationCap,
	},
	{
		title: "Perfil",
		to: "profile.edit",
		isMobileOnly: true,
	},
];
