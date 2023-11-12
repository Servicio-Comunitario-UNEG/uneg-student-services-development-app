import { Head } from "@inertiajs/react";

import { Career, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditCareerForm from "./Partials/CreateOrEditCareerForm";

export default function Edit({ career }: PageProps<{ career: Career }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Carrera",
			}}
		>
			<Head title="Editar Carrera" />

			<CreateOrEditCareerForm
				callToAction="Guardar cambios"
				initialValues={career}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
