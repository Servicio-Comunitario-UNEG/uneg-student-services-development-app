import type { Headquarter, PageProps } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateHeadquarterFormDialog from "./Partials/CreateHeadquarterFormDialog";
import { DataTable } from "@/Components/DataTable";
import PageLayout from "@/Layouts/PageLayout";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import HeadquarterCellAction from "./Partials/HeadquartersCellAction";

const columns: ColumnDef<Headquarter>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <HeadquarterCellAction {...cell} />,
	},
];

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
