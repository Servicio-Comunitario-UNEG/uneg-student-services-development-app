import CheckboxCellAction from "@/Pages/Benefits/Students/Partials/CheckboxCellAction";
import { SelectionProvider } from "@/context/SelectionProvider";
import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

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
import { Button } from "@/Components/ui/button";

import { useSelection } from "@/hooks/useSelection";

import { getFullName } from "@/lib/utils";

import BenefitCell from "./Partials/BenefitCell";
import BenefitOfferFilter from "./Partials/BenefitOfferFilter";

const columns: ColumnDef<StudentWithBenefits>[] = [
	{
		id: "select",
		cell: (cell) => <CheckboxCellAction {...cell} />,
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
		accessorKey: "benefits",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Beneficio" />
		),
		cell: (cell) => <BenefitCell {...cell} />,
		enableHiding: false,
		enableSorting: false,
	},
];

export type StudentWithBenefits = Student & {
	benefits: Array<
		BenefitSemesterHeadquarter & {
			benefit_semester: BenefitSemester & { benefit: Benefit };
		}
	>;
};

export type BenefitsStudentsPageProps = PageProps<{
	semesters: Semester[];
	headquarters: Headquarter[];
	benefits: Array<
		BenefitSemesterHeadquarter & {
			benefit_semester: BenefitSemester & { benefit: Benefit };
		}
	>;
	current_benefit: {
		available: number;
		benefit: BenefitSemesterHeadquarter;
	} | null;
	students: Paginated<StudentWithBenefits>;
	default_selected_students: number[];
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
	current_benefit,
	default_selected_students,
}: BenefitsStudentsPageProps) {
	const selection = useSelection();

	useEffect(() => {
		selection.setDefault(default_selected_students);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [default_selected_students]);

	// Current amount of benefits available.
	const availableBenefits = current_benefit
		? current_benefit.available -
			selection.data.selected.length +
			selection.data.unselected.length
		: 0;

	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Estudiante",
				description:
					"Administra los beneficios asignados a cada estudiante.",
				actions:
					(selection.data.selected.length ||
						selection.data.unselected.length) &&
					filters.benefit &&
					benefits.length ? (
						<Button
							onClick={() => {
								if (!current_benefit) return;

								router.post(
									route(
										"benefits-students.toggle",
										current_benefit.benefit.id,
									),
									selection.data,
									{
										onSuccess: () => selection.clear(),
									},
								);
							}}
						>
							Guardar cambios
						</Button>
					) : null,
			}}
		>
			<Head title="Beneficios por Estudiante" />

			<DataTable
				columns={columns}
				data={students}
				toolbar={
					<div className="space-y-2">
						<BenefitOfferFilter />

						{current_benefit ? (
							<p>
								Hay {availableBenefits} de{" "}
								{current_benefit.benefit.amount} beneficios
								disponibles
							</p>
						) : null}
					</div>
				}
				getRowId={(row) => String(row.id)}
				getIsSelected={(row) =>
					selection.data.selected.includes(row.id)
				}
			/>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<SelectionProvider>
		<AuthenticatedLayout children={page} />
	</SelectionProvider>
);
