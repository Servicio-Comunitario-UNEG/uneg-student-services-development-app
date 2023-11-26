import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { PageProps, Paginated, Student, Support, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import SupportCellAction from "./Partials/SupportCellAction";

const columns: ColumnDef<SupportWithUserAndStudent>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Fecha" />
		),
		cell: ({ row }) => dayjs(row.getValue("date")).format("DD/MM/YYYY"),
		enableSorting: false,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Tipo" />
		),
		cell: ({ row }) => {
			const { type } = row.original;

			return type === "medical" ? "Médico" : "Psicológico";
		},
		enableSorting: false,
	},
	{
		accessorKey: "user",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Profesional" />
		),
		cell: ({ row }) => {
			const { user } = row.original;

			return (
				<div className="space-y-2">
					<p>{user.name}</p>

					<p className="text-muted-foreground">
						{user.identity_card.nationality}
						{user.identity_card.serial}
					</p>
				</div>
			);
		},
		enableSorting: false,
	},
	{
		accessorKey: "student",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Estudiante" />
		),
		cell: ({ row }) => {
			const { student } = row.original;

			return (
				<div className="space-y-2">
					<p>
						{student.first_name} {student.last_name}
					</p>

					<p className="text-muted-foreground">
						{student.identity_card.nationality}
						{student.identity_card.serial}
					</p>
				</div>
			);
		},
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <SupportCellAction {...cell} />,
	},
];

export type SupportWithUserAndStudent = Support & {
	user: Omit<User, "email_verified_at">;
	student: Pick<Student, "id" | "first_name" | "last_name" | "identity_card">;
};

export type SupportsPageProps = PageProps<{
	supports: Paginated<SupportWithUserAndStudent>;
	filters: {
		page: number;
		per_page: number;
	};
}>;

export default function Index({ supports }: SupportsPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Apoyos",
				description:
					"Administra los apoyos que reciben los estudiantes.",
				actions: gate.allows("create supports") ? (
					<Button asChild>
						<Link href={route("supports.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Apoyos" />

			<DataTable columns={columns} paginatedData={supports} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
