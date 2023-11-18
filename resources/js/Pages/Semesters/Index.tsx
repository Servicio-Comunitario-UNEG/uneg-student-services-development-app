import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import { PageProps, Paginated, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import SemesterCellAction from "./Partials/CareerCellAction";

const columns: ColumnDef<Semester>[] = [
	{
		accessorKey: "year",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Año" />
		),
		cell: ({ row }) => row.getValue("year"),
	},
	{
		accessorKey: "lapse",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Lapso" />
		),
		cell: ({ row }) => row.getValue("lapse"),
	},
	{
		id: "actions",
		cell: (cell) => <SemesterCellAction {...cell} />,
	},
];

export type SemestersPageProps = PageProps<{
	semesters: Paginated<Semester>;
	filters: {
		page: number;
		per_page: number;
	};
}>;

export default function Index({ semesters }: SemestersPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Semestres",
				description:
					"Los semestres actuales y pasados de la universidad.",
				actions: gate.allows("create semesters") ? (
					<Button asChild>
						<Link href={route("semesters.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Semestres" />

			<DataTable columns={columns} paginatedData={semesters} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
