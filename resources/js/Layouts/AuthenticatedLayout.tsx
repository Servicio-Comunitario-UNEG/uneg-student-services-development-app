import type { ComponentPropsWithoutRef } from "react";
import NavBar from "./Partials/NavBar";
import PageLayout from "./PageLayout";

export function AuthenticatedLayout({
	children,
	headerProps,
}: ComponentPropsWithoutRef<typeof PageLayout>) {
	return (
		<div className="min-h-screen">
			<NavBar />

			<div className="p-6 sm:container">
				<PageLayout headerProps={headerProps}>{children}</PageLayout>
			</div>
		</div>
	);
}
