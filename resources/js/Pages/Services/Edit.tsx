import { Head } from "@inertiajs/react";

import { PageProps, Student, Service, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditServiceForm from "./Partials/CreateOrEditService";

export default function Edit({
	service,
	students,
	professionals,
}: PageProps<{
	service: Service;
	students: Student[];
	professionals: User[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Servicio",
			}}
		>
			<Head title="Editar Servicio" />

			<CreateOrEditServiceForm
				callToAction="Guardar cambios"
				initialValues={service}
				students={students}
				professionals={professionals}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
