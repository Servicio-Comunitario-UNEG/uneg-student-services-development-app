import { SelectionProvider } from "@/context/SelectionProvider";
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
import SelectionCheckbox from "@/Components/SelectionCheckbox";
import { Button } from "@/Components/ui/button";

import { useSelection } from "@/hooks/useSelection";

import { getFullName } from "@/lib/utils";

import BenefitOfferFilter from "./Partials/BenefitOfferFilter";

const columns: ColumnDef<Student>[] = [
	{
		id: "select",

		cell: ({ row }) => <SelectionCheckbox id={row.original.id} />,
		enableSorting: false,
		enableHiding: false,
	},
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

export default function Index({
	students,
	benefits,
	filters,
}: BenefitsStudentsPageProps) {
	const selection = useSelection();

	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Estudiante",
				description:
					"Administra los beneficios asignados a cada estudiante.",
				actions:
					selection.selected.length &&
					filters.benefit &&
					benefits.length ? (
						<Button>Asignar beneficio</Button>
					) : null,
			}}
		>
			<Head title="Beneficios por Estudiante" />

			<DataTable
				columns={columns}
				data={students}
				toolbar={<BenefitOfferFilter />}
				getRowId={(row) => String(row.id)}
				getIsSelected={(row) => selection.selected.includes(row.id)}
			/>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<SelectionProvider>
		<AuthenticatedLayout children={page} />
	</SelectionProvider>
);
