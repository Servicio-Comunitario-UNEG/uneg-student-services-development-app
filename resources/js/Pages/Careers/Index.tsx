import type { Career, PageProps } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateCareerFormDialog from "./Partials/CreateCareerFormDialog";

export default function Index({
	auth,
	careers,
}: PageProps<{ careers: Career[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Carreras",
				description: "Las carreras que los estudiantes pueden cursar.",
				actions: <CreateCareerFormDialog />,
			}}
		>
			<Head title="Carreras" />

			<pre>{JSON.stringify(careers, undefined, 2)}</pre>
		</AuthenticatedLayout>
	);
}
