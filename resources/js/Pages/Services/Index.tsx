import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import { PageProps, Paginated, Student, Service, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import { serviceTypeLabel } from "@/lib/constants";

import { DataTableToolbar } from "./Partials/DataTableToolbar";
import SupportCellAction from "./Partials/ServiceCellAction";

const columns: ColumnDef<ServiceWithUserAndStudent>[] = [
	{
		accessorKey: "date",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Fecha" />
		),
		cell: ({ row }) => dayjs(row.getValue("date")).format("DD/MM/YYYY"),
		enableSorting: false,
	},
	{
		accessorKey: "type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Tipo" />
		),
		cell: ({ row }) => serviceTypeLabel[row.original.type],
		enableSorting: false,
	},
	{
		accessorKey: "professional",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Profesional" />
		),
		cell: ({ row }) => {
			const { professional } = row.original;

			if (!professional) return "No aplica";

			return (
				<div className="space-y-2">
					<p>{professional.name}</p>

					<p className="text-muted-foreground">
						{professional.identity_card.nationality}
						{professional.identity_card.serial}
					</p>
				</div>
			);
		},
		enableSorting: false,
	},
	{
		accessorKey: "user",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Creador" />
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

export type ServiceWithUserAndStudent = Service & {
	user: Omit<User, "email_verified_at">;
	professional: Omit<User, "email_verified_at"> | null;
	student: Pick<Student, "id" | "first_name" | "last_name" | "identity_card">;
};

export type ServicesPageProps = PageProps<{
	services: Paginated<ServiceWithUserAndStudent>;
	filters: {
		page: number;
		per_page: number;
		range: {
			from: string | null;
			to: string | null;
		};
		types: string[];
	};
}>;

export default function Index({ services }: ServicesPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Servicios",
				description:
					"Administra los servicios que reciben los estudiantes.",
				actions: gate.allows("create services") ? (
					<Button asChild>
						<Link href={route("services.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Servicios" />

			<DataTable
				columns={columns}
				data={services}
				toolbar={<DataTableToolbar />}
			/>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
