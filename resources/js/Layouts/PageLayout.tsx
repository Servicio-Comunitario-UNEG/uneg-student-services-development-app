import { Link, usePage } from "@inertiajs/react";
import { Fragment } from "react";

import { Breadcrumb as BreadcrumbType, PageProps } from "@/types";

import Header from "./Partials/Header";

function Breadcrumb({ breadcrumbs }: { breadcrumbs: BreadcrumbType[] }) {
	return (
		<nav>
			<ul className="flex gap-2 text-sm">
				{breadcrumbs.map(({ title, url, current }) => {
					return (
						<Fragment key={url}>
							<li>
								{current ? (
									<p className="text-muted-foreground">
										{title}
									</p>
								) : (
									<Link
										href={url}
										className="text-muted-foreground/60 hover:underline"
									>
										{title}
									</Link>
								)}
							</li>

							{current ? null : (
								<li
									aria-hidden="true"
									className="text-muted-foreground/60"
								>
									/
								</li>
							)}
						</Fragment>
					);
				})}
			</ul>
		</nav>
	);
}

export default function PageLayout({
	headerProps,
	children,
}: {
	headerProps?: React.ComponentProps<typeof Header>;
	children?: React.ReactNode | React.ReactNode[];
}) {
	const { breadcrumbs } = usePage<PageProps>().props;

	return (
		<div className="space-y-6">
			<div className="space-y-2">
				{breadcrumbs && breadcrumbs.length > 1 ? (
					<Breadcrumb breadcrumbs={breadcrumbs} />
				) : null}

				{headerProps ? <Header {...headerProps} /> : null}
			</div>

			<main>{children}</main>
		</div>
	);
}
