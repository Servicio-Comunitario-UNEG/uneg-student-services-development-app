import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import type { Headquarter, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateHeadquarterFormDialog from "./Partials/CreateHeadquarterFormDialog";
import { DataTable } from "@/Components/DataTable";
import { columns } from "./columns";
import PageLayout from "@/Layouts/PageLayout";

export default function Index({
	headquarters,
}: PageProps<{ headquarters: Headquarter[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Sedes",
				description:
					"Las sedes son los lugares donde se encuentra la universidad.",
				actions: <CreateHeadquarterFormDialog />,
			}}
		>
			<Head title="Sedes" />

			<DataTable columns={columns} data={headquarters} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
