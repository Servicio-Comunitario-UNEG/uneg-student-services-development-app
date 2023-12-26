import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Estudiante",
				description:
					"Administra los beneficios asignados a cada estudiante.",
			}}
		>
			<Head title="Beneficios por Estudiante" />
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => <AuthenticatedLayout children={page} />;
