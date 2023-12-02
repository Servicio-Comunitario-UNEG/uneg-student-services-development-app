import { Head } from "@inertiajs/react";

import { PageProps, Student, Support } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditSupportForm from "./Partials/CreateOrEditSupport";

export default function Edit({
	support,
	students,
}: PageProps<{
	support: Support;
	students: Student[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Apoyo",
			}}
		>
			<Head title="Editar Apoyo" />

			<CreateOrEditSupportForm
				callToAction="Guardar cambios"
				initialValues={support}
				students={students}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
