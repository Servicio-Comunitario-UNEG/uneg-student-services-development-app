import type { Headquarter, PageProps, User } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateUserFormDialog from "./Partials/CreateUserFormDialog";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { DataTable } from "@/Components/DataTable";

const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
		enableHiding: false,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => row.getValue("email"),
		enableHiding: false,
		enableSorting: false,
	},
	{
		accessorKey: "role_name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rol" />
		),
		cell: ({ row }) => {
			const role = row.getValue("role_name") as User["role_name"];

			if (role === "admin") return "Administrador";

			if (role === "coordinator") return "Coordinador";

			return "Representante";
		},
		enableHiding: false,
		enableSorting: false,
	},
];

export default function Index({
	auth,
	headquarters,
	users,
}: PageProps<{ headquarters: Headquarter[]; users: User[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Usuarios",
				description: "Administra los usuarios que acceden al sistema.",
				actions: <CreateUserFormDialog headquarters={headquarters} />,
			}}
		>
			<Head title="Usuarios" />

			<DataTable columns={columns} data={users} />
		</AuthenticatedLayout>
	);
}
