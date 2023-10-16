import { Head } from "@inertiajs/react";
import { type ColumnDef } from "@tanstack/react-table";

import type { Career, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

import CareerCellAction from "./Partials/CareerCellAction";
import CreateCareerFormDialog from "./Partials/CreateCareerFormDialog";

const columns: ColumnDef<Career>[] = [
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
		cell: (cell) => <CareerCellAction {...cell} />,
	},
];
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
