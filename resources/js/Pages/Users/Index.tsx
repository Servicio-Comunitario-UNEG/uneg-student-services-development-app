import type { PageProps, Role, User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateUserFormDialog from "./Partials/CreateUserFormDialog";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { DataTable } from "@/Components/DataTable";
import UserCellAction from "./Partials/UserCellAction";
import { useGate } from "@/hooks/useGate";
import { DataTableToolbar } from "./Partials/DataTableToolbar";
import PageLayout from "@/Layouts/PageLayout";

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
			<DataTableColumnHeader column={column} title="Correo" />
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
	{
		id: "actions",
		cell: (cell) => <UserCellAction {...cell} />,
	},
];

export type UserPageProps = PageProps<{
	users: User[];
	roles: Role[];
	filters: {
		search: string;
	};
}>;

export default function Index({ users }: UserPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Usuarios",
				description: "Administra los usuarios que acceden al sistema.",
				actions: gate.any([
					"create users",
					"create non admin users",
				]) ? (
					<CreateUserFormDialog />
				) : null,
			}}
		>
			<Head title="Usuarios" />

			<DataTable
				toolbar={<DataTableToolbar />}
				columns={columns}
				data={users}
			/>
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
