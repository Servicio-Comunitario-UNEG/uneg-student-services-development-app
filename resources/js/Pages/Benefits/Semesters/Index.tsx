import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Semestre",
				description: "Administra los beneficios para cada semestre.",
			}}
		>
			<Head title="Beneficios por Semestre" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
