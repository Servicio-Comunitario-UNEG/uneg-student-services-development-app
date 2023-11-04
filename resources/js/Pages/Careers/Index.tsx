import { Head } from "@inertiajs/react";
import { type ColumnDef } from "@tanstack/react-table";

import type { Career, Headquarter, PageProps, Paginated } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

import CareerCellAction from "./Partials/CareerCellAction";
import CreateCareerFormDialog from "./Partials/CreateCareerFormDialog";
import { DataTableToolbar } from "./Partials/DataTableToolbar";

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

export type CareerPageProps = PageProps<{
	careers: Paginated<Career>;
	headquarters: Pick<Headquarter, "id" | "name">[];
	filters: {
		search: string;
		page: string;
		per_page: string;
	};
}>;

export default function Index({ careers }: CareerPageProps) {
	return (
		<PageLayout
			headerProps={{
				title: "Carreras",
				description: "Las carreras que los estudiantes pueden cursar.",
				actions: <CreateCareerFormDialog />,
			}}
		>
			<Head title="Carreras" />

			<DataTable
				columns={columns}
				paginatedData={careers}
				toolbar={<DataTableToolbar />}
			/>
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
