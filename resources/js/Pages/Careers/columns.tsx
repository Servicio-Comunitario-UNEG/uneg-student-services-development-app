import type { Career } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";

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
];
