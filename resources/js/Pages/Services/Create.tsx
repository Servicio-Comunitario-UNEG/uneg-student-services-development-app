import { Head } from "@inertiajs/react";

import { PageProps, Student, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditServiceForm from "./Partials/CreateOrEditService";

export default function Create({
	students,
	professionals,
}: PageProps<{
	students: Student[];
	professionals: User[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Servicio",
			}}
		>
			<Head title="Crear Servicio" />

			<CreateOrEditServiceForm
				callToAction="Crear"
				initialValues={{
					date: "",
					description: "",
					type: "medical",
				}}
				students={students}
				professionals={professionals}
			/>
		</PageLayout>
	);
}

Create.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
