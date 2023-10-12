import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import type { Headquarter, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateHeadquarterFormDialog from "./Partials/CreateHeadquarterFormDialog";
import { DataTable } from "@/Components/DataTable";
import { columns } from "./columns";

export default function Index({
	headquarters,
}: PageProps<{ headquarters: Headquarter[] }>) {
	return (
		<AuthenticatedLayout
			headerProps={{
				title: "Sedes",
				description:
					"Las sedes son los lugares donde se encuentra la universidad.",
				actions: <CreateHeadquarterFormDialog />,
			}}
		>
			<Head title="Sedes" />

			<DataTable columns={columns} data={headquarters} />
		</AuthenticatedLayout>
	);
}
