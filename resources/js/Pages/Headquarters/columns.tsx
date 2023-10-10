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
		accessorKey: "address",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Dirección" />
		),
		cell: ({ row }) => (
			<div className="max-w-2xl truncate">{row.getValue("address")}</div>
		),
		enableHiding: false,
		enableSorting: false,
	},
	{
		id: "actions",
		cell: (cell) => <HeadquarterCellAction {...cell} />,
	},
];
