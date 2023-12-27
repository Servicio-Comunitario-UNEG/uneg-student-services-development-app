import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import {
	Benefit,
	BenefitSemester,
	BenefitSemesterHeadquarter,
	Headquarter,
	PageProps,
	Paginated,
	Semester,
	Student,
} from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

import { getFullName } from "@/lib/utils";

import BenefitOfferFilter from "./Partials/BenefitOfferFilter";

const columns: ColumnDef<Student>[] = [
	{
		id: "full_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre Completo" />
		),
		cell: ({ row }) => getFullName(row.original),
	},
	{
		accessorKey: "identity_card",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Cédula" />
		),
		cell: ({ row }) => {
			const card = row.getValue(
				"identity_card",
			) as Student["identity_card"];

			return `${card.nationality}${card.serial}`;
		},
		enableHiding: false,
		enableSorting: false,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Correo" />
		),
		cell: ({ row }) => row.getValue("email"),
		enableHiding: false,
		enableSorting: false,
	},
	{
		accessorKey: "cell_phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Teléfono" />
		),
		cell: ({ row }) => row.getValue("cell_phone"),
		enableHiding: false,
		enableSorting: false,
	},
];

export type BenefitsStudentsPageProps = PageProps<{
	semesters: Semester[];
	headquarters: Headquarter[];
	benefits: Array<
		BenefitSemesterHeadquarter & {
			benefit_semester: BenefitSemester & { benefit: Benefit };
		}
	>;
	students: Paginated<Student>;
	filters: {
		semester: string | null;
		headquarter: string | null;
		benefit: string | null;
		page: number;
		per_page: number;
	};
}>;

export default function Index({ students }: BenefitsStudentsPageProps) {
	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Estudiante",
				description:
					"Administra los beneficios asignados a cada estudiante.",
			}}
		>
			<Head title="Beneficios por Estudiante" />

			<DataTable
				columns={columns}
				paginatedData={students}
				toolbar={<BenefitOfferFilter />}
			/>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
