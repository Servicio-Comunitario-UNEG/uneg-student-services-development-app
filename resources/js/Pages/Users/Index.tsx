import { Head } from "@inertiajs/react";
import type { ColumnDef } from "@tanstack/react-table";

import type { PageProps, Paginated, Role, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

import { useGate } from "@/hooks/useGate";

import CreateUserFormDialog from "./Partials/CreateUserFormDialog";
import { DataTableToolbar } from "./Partials/DataTableToolbar";
import UserCellAction from "./Partials/UserCellAction";

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
		accessorKey: "identity_card",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Cédula" />
		),
		cell: ({ row }) => {
			const card = row.getValue("identity_card") as User["identity_card"];

			return `${card.nationality}${card.serial}`;
		},
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
	users: Paginated<User>;
	roles: Role[];
	assignableRoles: Role[];
	filters: {
		search: string;
		roles: string[];
		page: number;
		per_page: number;
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
				paginatedData={users}
			/>
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
