import type { Career } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import CareerCellAction from "./Partials/CareerCellAction";

export const columns: ColumnDef<Career>[] = [
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
		cell: (cell) => <CareerCellAction {...cell} />,
	},
];
