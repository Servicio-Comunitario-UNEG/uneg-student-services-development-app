import { Link } from "@inertiajs/react";

import UserNavigation from "@/Components/UserNavigation";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import { links } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function SideBar({ className }: { className?: string }) {
	const gate = useGate();

	return (
		<div
			className={cn(
				"flex min-h-screen w-full flex-col justify-between border-r p-6",
				className,
			)}
		>
			<nav>
				<ul className="space-y-1">
					{links.map(
						({ title, to, isMobileOnly, permission, Icon }) => {
							const isActive = route().current(to);

							if (
								isMobileOnly ||
								(permission && !gate.allows(permission))
							) {
								return;
							}

							return (
								<li key={to}>
									<Button
										variant={
											isActive ? "secondary" : "ghost"
										}
										className="w-full justify-start"
										asChild
									>
										<Link href={route(to)}>
											{Icon ? (
												<Icon className="mr-2 h-4 w-4" />
											) : null}

											<span>{title}</span>
										</Link>
									</Button>
								</li>
							);
						},
					)}
				</ul>
			</nav>

			<UserNavigation />
		</div>
	);
}
