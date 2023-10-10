import type { PageProps } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Usuarios",
				description: "Administra los usuarios que acceden al sistema.",
			}}
		>
			<Head title="Usuarios" />
		</AuthenticatedLayout>
	);
}
