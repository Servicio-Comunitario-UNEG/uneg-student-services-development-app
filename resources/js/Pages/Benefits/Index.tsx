import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Beneficios",
				description:
					"Administra los beneficios para cada sede y estudiante en un semestre.",
			}}
		>
			<Head title="Beneficios" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
