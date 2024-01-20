import { Head, Link } from "@inertiajs/react";
import { type ColumnDef } from "@tanstack/react-table";

import type { Headquarter, PageProps, Paginated, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import { DataTableToolbar } from "./Partials/DataTableToolbar";
import HeadquarterCellAction from "./Partials/HeadquartersCellAction";

const columns: ColumnDef<HeadquarterWithRepresentative>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
		enableHiding: false,
		enableSorting: true,
	},
	{
		accessorKey: "user",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Representante" />
		),
		cell: ({ row }) => {
			const user = row.getValue(
				"user",
			) as HeadquarterWithRepresentative["user"];

			if (!user) return null;

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
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <HeadquarterCellAction {...cell} />,
	},
];

export type HeadquarterWithRepresentative = Headquarter & {
	user: Omit<User, "email" | "email_verified_at"> | null;
};

export type HeadquarterPageProps = PageProps<{
	headquarters: Paginated<HeadquarterWithRepresentative>;
	filters: {
		search: string;
		page: string;
		per_page: string;
	};
}>;

export default function Index({ headquarters }: HeadquarterPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Sedes",
				description:
					"Las sedes son los lugares donde se encuentra la universidad.",
				actions: gate.allows("create headquarters") ? (
					<Button asChild>
						<Link href={route("headquarters.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Sedes" />

			<DataTable
				columns={columns}
				data={headquarters}
				toolbar={<DataTableToolbar />}
			/>
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
