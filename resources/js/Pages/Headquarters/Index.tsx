import { Head } from "@inertiajs/react";
import { type ColumnDef } from "@tanstack/react-table";

import type { Headquarter, PageProps, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

import CreateHeadquarterFormDialog from "./Partials/CreateHeadquarterFormDialog";
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

export type HeadquarterPageProps = PageProps<{
	headquarters: Headquarter[];
	representatives: Array<
		Pick<User, "id" | "name" | "identity_card"> & {
			is_available: boolean;
		}
	>;
}>;

export default function Index({ headquarters }: HeadquarterPageProps) {
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
