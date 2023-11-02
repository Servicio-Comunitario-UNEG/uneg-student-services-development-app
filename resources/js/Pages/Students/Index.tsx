import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateStudentFormDialog from "./Partials/CreateStudentFormDialog";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Estudiantes",
				actions: <CreateStudentFormDialog />,
			}}
		>
			<Head title="Estudiantes" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
