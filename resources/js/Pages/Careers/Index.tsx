import { Head, Link } from "@inertiajs/react";
import { type ColumnDef } from "@tanstack/react-table";

import type { Career, Headquarter, PageProps, Paginated } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import CareerCellAction from "./Partials/CareerCellAction";
import { DataTableToolbar } from "./Partials/DataTableToolbar";

export type CareerWithHeadquarters = Career & {
	headquarters: Array<
		Pick<Headquarter, "id" | "name"> & {
			pivot: {
				career_id: number;
				headquarter_id: number;
			};
		}
	>;
};

const columns: ColumnDef<CareerWithHeadquarters>[] = [
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
	careers: Paginated<CareerWithHeadquarters>;
	headquarters: Pick<Headquarter, "id" | "name">[];
	filters: {
		search: string;
		page: string;
		per_page: string;
	};
}>;

export default function Index({ careers }: CareerPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Carreras",
				description: "Las carreras que los estudiantes pueden cursar.",
				actions: gate.allows("create careers") ? (
					<Button asChild>
						<Link href={route("careers.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Carreras" />

			<DataTable
				columns={columns}
				data={careers}
				toolbar={<DataTableToolbar />}
			/>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
