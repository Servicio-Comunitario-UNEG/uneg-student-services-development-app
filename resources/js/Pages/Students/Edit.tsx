import { Head } from "@inertiajs/react";

import { PageProps, Student } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditStudentForm from "./Partials/CreateOrEditStudentForm";

export default function Edit({ student }: PageProps<{ student: Student }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Estudiante",
			}}
		>
			<Head title="Editar Estudiante" />

			<CreateOrEditStudentForm
				callToAction="Guardar cambios"
				initialValues={student}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
