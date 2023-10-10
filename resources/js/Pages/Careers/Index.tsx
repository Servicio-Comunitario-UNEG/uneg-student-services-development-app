import type { PageProps } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ auth }: PageProps) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Carreras",
				description: "Las carreras que los estudiantes pueden cursar.",
			}}
		>
			<Head title="Carreras" />
		</AuthenticatedLayout>
	);
}
