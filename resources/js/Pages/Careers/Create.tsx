import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditCareerForm from "./Partials/CreateOrEditCareerForm";

export default function Create() {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Carrera",
			}}
		>
			<Head title="Crear Carrera" />

			<CreateOrEditCareerForm
				callToAction="Crear"
				initialValues={{
					name: "",
				}}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
