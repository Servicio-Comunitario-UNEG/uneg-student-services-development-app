import { Link, usePage } from "@inertiajs/react";
import { Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

import { PageProps } from "@/types";

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import { links } from "@/lib/constants";
import { cn } from "@/lib/utils";

function MobileLink({
	children,
	isActive,
	to,
}: {
	children: React.ReactNode | React.ReactNode[];
	isActive: boolean;
	to: string;
}) {
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
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const {
		props: {
			auth: { user },
		},
		url,
	} = usePage<PageProps>();
	const gate = useGate();

	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			<ul className="flex-col gap-4">
				{links.map(({ title, to, permission, urlStartsWith }) => {
					if (permission && !gate.allows(permission)) return;

					return (
						<li key={to}>
							<MobileLink
								to={to}
								isActive={
									urlStartsWith
										? url.startsWith(urlStartsWith)
										: route().current(to)
								}
							>
								{title}
							</MobileLink>
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
	...props
}: React.ComponentPropsWithoutRef<"nav">) {
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
			<div className="flex h-14 items-center justify-between px-6">
				<ApplicationLogo height={24} width={24} />

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

			<div
				className={cn(
					showingNavigationDropdown ? "block" : "hidden",
					"lg:hidden",
				)}
			>
				<MobileMenu />
			</div>
		</nav>
	);
}
