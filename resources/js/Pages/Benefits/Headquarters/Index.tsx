import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Sede",
				description:
					"Administra los beneficios ofrecidos en cada sede en un semestre.",
			}}
		>
			<Head title="Beneficios por Sede" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
