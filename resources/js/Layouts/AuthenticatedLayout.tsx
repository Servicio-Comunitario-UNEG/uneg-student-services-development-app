import type { ComponentPropsWithoutRef } from "react";
import NavBar from "./Partials/NavBar";
import { User } from "@/types";
import PageLayout from "./PageLayout";

export function AuthenticatedLayout({
	children,
	user,
	headerProps,
}: {
	user: User;
} & ComponentPropsWithoutRef<typeof PageLayout>) {
	return (
		<div className="min-h-screen">
			<NavBar user={user} />

			<div className="p-6 sm:container">
				<PageLayout headerProps={headerProps}>{children}</PageLayout>
			</div>
		</div>
	);
}
