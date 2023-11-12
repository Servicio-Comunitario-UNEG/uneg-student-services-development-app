import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import { PageProps, Paginated, Student } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { DataTableToolbar } from "./Partials/DataTableToolbar";
import StudentCellAction from "./Partials/StudentCellAction";

const columns: ColumnDef<Student>[] = [
	{
		id: "full_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre Completo" />
		),
		cell: ({ row }) => {
			const { first_name, second_name, last_name, second_last_name } =
				row.original;

			return [
				first_name,
				second_name,
				last_name,
				second_last_name,
			].reduce((previous, current) => {
				if (!previous) return current ?? "";

				if (!current) return previous;

				return previous.concat(` ${current}`);
			}, "");
		},
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
		id: "actions",
		cell: (cell) => <StudentCellAction {...cell} />,
	},
];

export type StudentsPageProps = PageProps<{
	students: Paginated<Student>;
	filters: {
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
