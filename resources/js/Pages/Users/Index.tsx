import type { Headquarter, PageProps, Role, User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateUserFormDialog from "./Partials/CreateUserFormDialog";
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
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Rol" />
		),
		cell: ({ row }) => {
			const role = row.getValue("role") as User["role"];

			return role.description;
		},
		enableHiding: false,
		enableSorting: false,
	},
];

export default function Index({
	auth,
	headquarters,
	users,
	roles,
}: PageProps<{
	headquarters: Headquarter[];
	users: User[];
	roles: Role[];
}>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Usuarios",
				description: "Administra los usuarios que acceden al sistema.",
				actions: (
					<CreateUserFormDialog
						headquarters={headquarters}
						roles={roles}
					/>
				),
			}}
		>
			<Head title="Usuarios" />

			<DataTable columns={columns} data={users} />
		</AuthenticatedLayout>
	);
}
