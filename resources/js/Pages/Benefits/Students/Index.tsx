import CheckboxCellAction from "@/Pages/Benefits/Students/Partials/CheckboxCellAction";
import { SelectionProvider } from "@/context/SelectionProvider";
import { Head, router } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect } from "react";

import {
	Benefit,
	BenefitSemester,
	BenefitSemesterHeadquarter,
	Career,
	CareerHeadquarter,
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

import { cn, getFullName } from "@/lib/utils";

import BenefitCell from "./Partials/BenefitCell";
import BenefitOfferFilter from "./Partials/BenefitOfferFilter";
import CheckboxHeaderAction from "./Partials/CheckboxHeaderAction";
import { DataTableToolbar } from "./Partials/DataTableToolbar";

const columns: ColumnDef<StudentWithBenefits>[] = [
	{
		id: "select",
		header: (cell) => <CheckboxHeaderAction {...cell} />,
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
		accessorKey: "career_headquarter",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Carrera" />
		),
		cell: ({ row }) => {
			const {
				career: { name },
			} = row.getValue(
				"career_headquarter",
			) as StudentWithBenefits["career_headquarter"];

			return name;
		},
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
	career_headquarter: CareerHeadquarter & {
		career: Career;
	};
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
	careers: Career[];
	filters: {
		search: string;
		semester: string | null;
		careers: string[];
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
										"benefits-headquarters.toggle",
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

			<div className="space-y-6">
				<div className="space-y-2">
					<BenefitOfferFilter />

					{current_benefit ? (
						<div className="flex items-center gap-2">
							<span
								className={cn(
									"flex h-2 w-2 rounded-full",
									availableBenefits > 0
										? "bg-green-500"
										: "bg-red-500",
								)}
							/>

							<p className="text-muted-foreground">
								Hay {availableBenefits} de{" "}
								{current_benefit.benefit.amount} beneficios
								disponibles
							</p>
						</div>
					) : null}
				</div>

				<DataTable
					columns={columns}
					data={students}
					toolbar={<DataTableToolbar />}
					getRowId={(row) => String(row.id)}
					getIsSelected={(row) =>
						selection.data.selected.includes(row.id)
					}
				/>
			</div>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<SelectionProvider>
		<AuthenticatedLayout children={page} />
	</SelectionProvider>
);
