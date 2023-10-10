import { DataTableColumnHeader } from "@/Components/DataTableColumnHeader";
import { Headquarter } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import HeadquarterCellAction from "./Partials/HeadquartersCellAction";

export const columns: ColumnDef<Headquarter>[] = [
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
		cell: (cell) => <HeadquarterCellAction {...cell} />,
	},
];
