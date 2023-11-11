import { Head } from "@inertiajs/react";

import { Career, Headquarter, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateStudentFormDialog from "./Partials/CreateStudentFormDialog";

export type StudentPageProps = PageProps<{
	careers_by_headquarter: {
		career: Pick<Career, "id" | "name">;
		headquarter: Pick<Headquarter, "id" | "name">;
		id: number;
	}[];
	maximum_enrollable_birth_date: string;
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
