import { Head, Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";

import { Benefit, PageProps, Paginated } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DataTable } from "@/Components/DataTable";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

import BenefitCellAction from "./Partials/BenefitCellAction";

const columns: ColumnDef<Benefit>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nombre" />
		),
		cell: ({ row }) => row.getValue("name"),
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <BenefitCellAction {...cell} />,
	},
];

export type BenefitsPageProps = PageProps<{
	benefits: Paginated<Benefit>;
	filters: {
		page: string;
		per_page: string;
	};
}>;

export default function Index({ benefits }: BenefitsPageProps) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Beneficios",
				description:
					"Los beneficios que pueden ser ofrecidos en cualquier semestre.",
				actions: gate.allows("create benefits") ? (
					<Button asChild>
						<Link href={route("benefits.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Beneficios" />

			<DataTable columns={columns} paginatedData={benefits} />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
