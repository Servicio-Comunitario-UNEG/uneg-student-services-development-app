import { Head } from "@inertiajs/react";

import { PageProps, Student } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditSupportForm from "./Partials/CreateOrEditSupport";

export default function Create({
	students,
}: PageProps<{
	students: Student[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Apoyo",
			}}
		>
			<Head title="Crear Apoyo" />

			<CreateOrEditSupportForm
				callToAction="Crear"
				initialValues={{
					date: "",
					description: "",
					type: "medical",
				}}
				students={students}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
