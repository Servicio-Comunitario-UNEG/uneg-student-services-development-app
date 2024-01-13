import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditSemesterForm from "./Partials/CreateOrEditSemesterForm";

export default function Create() {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Semestre",
			}}
		>
			<Head title="Crear Semestre" />

			<CreateOrEditSemesterForm callToAction="Crear" initialValues={{}} />
		</PageLayout>
	);
}

Create.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
