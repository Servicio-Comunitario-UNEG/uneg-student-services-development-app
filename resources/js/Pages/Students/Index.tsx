import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateStudentFormDialog from "./Partials/CreateStudentFormDialog";

export type StudentPageProps = PageProps<{
	max_birth_date: string;
}>;
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
