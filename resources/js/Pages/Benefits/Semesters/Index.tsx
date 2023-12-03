import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import {
	Benefit,
	BenefitSemester,
	PageProps,
	Paginated,
	Semester,
} from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import BenefitSemesterCellAction from "./Partials/BenefitSemesterCellAction";

const columns: ColumnDef<BenefitSemesterWithRelation>[] = [
	{
		accessorKey: "benefit",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Beneficio" />
		),
		cell: ({ row }) => {
			const { benefit } = row.original;

			return benefit.name;
		},
		enableHiding: false,
		enableSorting: false,
	},
	{
		accessorKey: "semester",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Semestre" />
		),
		cell: ({ row }) => {
			const { semester } = row.original;

			return `${semester.year}-${semester.lapse}`;
		},
		enableHiding: false,
		enableSorting: false,
	},
	{
		accessorKey: "amount",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Cantidad" />
		),
		cell: ({ row }) => row.getValue("amount"),
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <BenefitSemesterCellAction {...cell} />,
	},
];

export type BenefitSemesterWithRelation = BenefitSemester & {
	benefit: Benefit;
	semester: Semester;
};

export type BenefitSemesterPageProps = PageProps<{
	benefits_semesters: Paginated<BenefitSemesterWithRelation>;
}>;

export default function Index({
	benefits_semesters,
}: BenefitSemesterPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Semestre",
				description:
					"Administra los beneficios para cada semestre y su cantidad.",
				actions: gate.allows("create benefits") ? (
					<Button asChild>
						<Link href={route("benefits-semesters.create")}>
							Asignar
						</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Beneficios por Semestre" />

			<DataTable columns={columns} paginatedData={benefits_semesters} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
