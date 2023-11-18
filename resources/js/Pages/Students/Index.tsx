import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import {
	Career,
	CareerHeadquarter,
	Headquarter,
	PageProps,
	Paginated,
	Student,
} from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { getFullName } from "@/lib/utils";

import { DataTableToolbar } from "./Partials/DataTableToolbar";
import StudentCellAction from "./Partials/StudentCellAction";

const columns: ColumnDef<StudentWithCareerHeadquarter>[] = [
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
	{
		id: "career",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Carrera" />
		),
		cell: ({ row }) => {
			const { career_headquarter } = row.original;

			if (!career_headquarter) return null;

			return career_headquarter.career.name;
		},
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "headquarter",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Sede" />
		),
		cell: ({ row }) => {
			const { career_headquarter } = row.original;

			if (!career_headquarter) return null;

			return career_headquarter.headquarter.name;
		},
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <StudentCellAction {...cell} />,
	},
];

export type StudentWithCareerHeadquarter = Student & {
	career_headquarter?: CareerHeadquarter & {
		career: Career;
		headquarter: Headquarter;
	};
};

export type StudentsPageProps = PageProps<{
	students: Paginated<StudentWithCareerHeadquarter>;
	careers: Pick<Career, "id" | "name">[];
	headquarters: Pick<Headquarter, "id" | "name" | "user_id">[];
	filters: {
		careers: string[];
		headquarters: string[];
		search: string;
		page: number;
		per_page: number;
	};
}>;

export default function Index({ students }: StudentsPageProps) {
	return (
		<PageLayout
			headerProps={{
				title: "Estudiantes",
				description: "Los estudiantes inscritos en la universidad.",
				actions: (
					<Button asChild>
						<Link href={route("students.create")}>Crear</Link>
					</Button>
				),
			}}
		>
			<Head title="Estudiantes" />

			<DataTable
				columns={columns}
				paginatedData={students}
				toolbar={<DataTableToolbar />}
			/>
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
