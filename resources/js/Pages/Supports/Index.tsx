import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Apoyos",
				description:
					"Administra los apoyos que reciben los estudiantes.",
			}}
		>
			<Head title="Apoyos" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
