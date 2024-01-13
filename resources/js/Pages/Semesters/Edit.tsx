import { Head } from "@inertiajs/react";

import { PageProps, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditSemesterForm from "./Partials/CreateOrEditSemesterForm";

export default function Edit({ semester }: PageProps<{ semester: Semester }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Semestre",
			}}
		>
			<Head title="Editar Semestre" />

			<CreateOrEditSemesterForm
				callToAction="Guardar cambios"
				initialValues={semester}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
