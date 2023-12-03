import { Link, usePage } from "@inertiajs/react";
import { ChevronsUpDown, Dot } from "lucide-react";

import UserNavigation from "@/Components/UserNavigation";
import { Button } from "@/Components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/Components/ui/collapsible";

import { useGate } from "@/hooks/useGate";

import { links } from "@/lib/constants";
import { cn, isActiveLink } from "@/lib/utils";

export default function SideBar({ className }: { className?: string }) {
	const gate = useGate();
	const { url } = usePage();

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
						({
							title,
							to,
							isMobileOnly,
							permission,
							Icon,
							urlStartsWith,
							sublinks,
						}) => {
							if (
								isMobileOnly ||
								(permission && !gate.allows(permission))
							) {
								return;
							}

							const isParentActive = isActiveLink({
								url,
								urlStartsWith,
								to,
								isParent: true,
							});

							if (sublinks) {
								return (
									<li key={to}>
										<Collapsible className="space-y-1">
											<CollapsibleTrigger asChild>
												<Button
													variant="ghost"
													className="w-full justify-between"
												>
													<div className="flex">
														{Icon ? (
															<Icon className="mr-2 h-4 w-4" />
														) : null}

														<span>{title}</span>
													</div>

													<ChevronsUpDown className="h-4 w-4" />
												</Button>
											</CollapsibleTrigger>

											<CollapsibleContent asChild>
												<ul className="space-y-1">
													<li>
														<Button
															variant={
																isParentActive
																	? "secondary"
																	: "ghost"
															}
															className="w-full justify-start"
															asChild
														>
															<Link
																href={route(to)}
															>
																{isParentActive ? (
																	<Dot className="mr-2 h-4 w-4" />
																) : (
																	<div
																		className="mr-2 w-4"
																		aria-hidden="true"
																	/>
																)}

																<span>
																	General
																</span>
															</Link>
														</Button>
													</li>

													{sublinks.map((link) => {
														const isActive =
															isActiveLink({
																url,
																to: link.to,
																urlStartsWith:
																	link.urlStartsWith,
																isParent: false,
															});

														return (
															<li key={link.to}>
																<Button
																	variant={
																		isActive
																			? "secondary"
																			: "ghost"
																	}
																	className="w-full justify-start"
																	asChild
																>
																	<Link
																		href={route(
																			link.to,
																		)}
																	>
																		{isActive ? (
																			<Dot className="mr-2 h-4 w-4" />
																		) : (
																			<div
																				className="mr-2 w-4"
																				aria-hidden="true"
																			/>
																		)}

																		<span>
																			{
																				link.title
																			}
																		</span>
																	</Link>
																</Button>
															</li>
														);
													})}
												</ul>
											</CollapsibleContent>
										</Collapsible>
									</li>
								);
							}

							return (
								<li key={to}>
									<Button
										variant={
											isParentActive
												? "secondary"
												: "ghost"
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
