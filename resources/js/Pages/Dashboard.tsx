import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Dashboard",
			}}
		>
			<Head title="Dashboard" />
		</AuthenticatedLayout>
	);
}
