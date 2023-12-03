import { Link, usePage } from "@inertiajs/react";
import { ChevronsUpDown, Dot } from "lucide-react";

import { PageProps } from "@/types";

import UserNavigation from "@/Components/UserNavigation";
import { Button } from "@/Components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/Components/ui/collapsible";

import { useGate } from "@/hooks/useGate";

import { MobileLink, links } from "@/lib/constants";
import { cn, isActiveLink } from "@/lib/utils";

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

							if (!sublinks) {
								return (
									<li key={to}>
										<ItemLink
											to={to}
											Icon={Icon}
											title={title}
											urlStartsWith={urlStartsWith}
											isParent
										/>
									</li>
								);
							}

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
													<ItemLink
														to={to}
														Icon={Dot}
														title="General"
														urlStartsWith={
															urlStartsWith
														}
														isParent
														isIconOnActiveOnly
													/>
												</li>

												{sublinks.map((link) => {
													return (
														<ItemLink
															key={link.to}
															to={link.to}
															title={link.title}
															Icon={Dot}
															urlStartsWith={
																link.urlStartsWith
															}
															isIconOnActiveOnly
														/>
													);
												})}
											</ul>
										</CollapsibleContent>
									</Collapsible>
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

/**
 * Each item on sidebar.
 */
function ItemLink({
	Icon,
	title,
	to,
	urlStartsWith,
	isParent = false,
	isIconOnActiveOnly = false,
}: Pick<MobileLink, "Icon" | "title" | "to" | "urlStartsWith"> & {
	isParent?: boolean;
	isIconOnActiveOnly?: boolean;
}) {
	const { url } = usePage<PageProps>();

	const isActive = isActiveLink({
		url,
		isParent,
		to,
		urlStartsWith,
	});

	const shouldDisplayIcon = isIconOnActiveOnly ? isActive : true;

	return (
		<Button
			variant={isActive ? "secondary" : "ghost"}
			className="w-full justify-start"
			asChild
		>
			<Link href={route(to)}>
				{isIconOnActiveOnly && !shouldDisplayIcon ? (
					<div className="mr-2 w-4" aria-hidden="true" />
				) : null}

				{shouldDisplayIcon && Icon ? (
					<Icon className="mr-2 h-4 w-4" />
				) : null}

				<span>{title}</span>
			</Link>
		</Button>
	);
}
