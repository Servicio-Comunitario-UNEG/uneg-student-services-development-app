import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import { PageProps, Paginated, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

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
];

export type SemestersPageProps = PageProps<{
	semesters: Paginated<Semester>;
	filters: {
		page: number;
		per_page: number;
	};
}>;

export default function Index({ semesters }: SemestersPageProps) {
	return (
		<PageLayout
			headerProps={{
				title: "Semestres",
				description:
					"Los semestres actuales y pasados de la universidad.",
			}}
		>
			<Head title="Semestres" />

			<DataTable columns={columns} paginatedData={semesters} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
