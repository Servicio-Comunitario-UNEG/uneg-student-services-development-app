import { Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { User } from "@/types";
import { Button } from "@/Components/ui/button";
import ApplicationLogo from "@/Components/ApplicationLogo";
import UserNavigation from "@/Components/UserNavigation";

const links: {
	title: string;
	to: string;
	isMobileOnly?: boolean;
}[] = [
	{
		title: "Dashboard",
		to: "dashboard",
	},
	{
		title: "Sedes",
		to: "headquarters.index",
	},
	{
		title: "Perfil",
		to: "profile.edit",
		isMobileOnly: true,
	},
];

function Menu({ className, ...props }: React.ComponentPropsWithoutRef<"ul">) {
	return (
		<ul className={cn("flex items-center", className)} {...props}>
			{links.map(({ title, to, isMobileOnly }) => {
				const isActive = route().current(to);

				if (isMobileOnly) return;

				return (
					<li className="block" key={to}>
						<Link
							href={route(to)}
							className={cn(
								"px-2 py-4 text-sm font-medium transition-colors hover:text-foreground/80",
								isActive
									? "text-foreground"
									: "text-foreground/60",
							)}
						>
							{title}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

function MobileLink({
	children,
	to,
}: {
	children: React.ReactNode | React.ReactNode[];
	to: string;
}) {
	const isActive = route().current(to);

	return (
		<Link
			href={route(to)}
			className={cn(
				"flex w-full items-start border-l-4 py-2 pl-3 pr-4 hover:bg-accent",
				"text-base font-medium transition duration-150 ease-in-out focus:outline-none",
				isActive
					? "border-primary text-foreground"
					: "border-muted text-foreground/60",
			)}
		>
			{children}
		</Link>
	);
}

function MobileMenu({
	user,
	className,
	...props
}: React.ComponentPropsWithoutRef<"div"> & {
	user: User;
}) {
	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			<ul className="flex-col gap-4">
				{links.map(({ title, to }) => {
					return (
						<li key={to}>
							<MobileLink to={to}>{title}</MobileLink>
						</li>
					);
				})}
			</ul>

			<div className="border-t border-primary py-4">
				<div className="px-4">
					<div className="text-base font-medium text-foreground">
						{user.name}
					</div>

					<div className="text-sm font-medium text-foreground/80">
						{user.email}
					</div>
				</div>

				<div className="mt-3 space-y-1">
					<Button variant="ghost" className="w-full" asChild>
						<Link href={route("logout")} as="button" method="post">
							Cerrar Sesión
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default function NavBar({
	className,
	user,
	...props
}: React.ComponentPropsWithoutRef<"nav"> & {
	user: User;
}) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false);

	return (
		<nav
			className={cn(
				"supports-backdrop-blur:bg-background/60 sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur",
				className,
			)}
			{...props}
		>
			<div className="flex h-14 justify-between px-6 sm:container">
				<div className="flex gap-6">
					<div className="flex shrink-0 items-center">
						<ApplicationLogo height={24} width={24} />
					</div>

					<div className="hidden lg:flex">
						<Menu />
					</div>
				</div>

				<div className="hidden space-x-2 lg:ml-6 lg:flex lg:items-center">
					<UserNavigation user={user} />
				</div>

				<div className="flex items-center gap-2 lg:hidden">
					<Button
						variant="ghost"
						size="icon"
						onClick={() =>
							setShowingNavigationDropdown(
								(previousState) => !previousState,
							)
						}
					>
						{showingNavigationDropdown ? (
							<X className="h-4 w-4" />
						) : (
							<MenuIcon className="h-4 w-4" />
						)}
					</Button>
				</div>
			</div>

			<div
				className={cn(
					showingNavigationDropdown ? "block" : "hidden",
					"lg:hidden",
				)}
			>
				<MobileMenu user={user} />
			</div>
		</nav>
	);
}