import type { Career, PageProps } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateCareerFormDialog from "./Partials/CreateCareerFormDialog";
import { DataTable } from "@/Components/DataTable";
import { columns } from "./columns";
import PageLayout from "@/Layouts/PageLayout";

export default function Index({ careers }: PageProps<{ careers: Career[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Carreras",
				description: "Las carreras que los estudiantes pueden cursar.",
				actions: <CreateCareerFormDialog />,
			}}
		>
			<Head title="Carreras" />

			<DataTable columns={columns} data={careers} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
