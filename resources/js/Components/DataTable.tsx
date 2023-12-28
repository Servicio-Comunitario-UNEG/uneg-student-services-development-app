import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	InitialTableState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	getPaginationRowModel,
	TableOptions,
} from "@tanstack/react-table";
import { useState } from "react";

import { Paginated } from "@/types";

import { cn } from "@/lib/utils";

import { DataTableManualPagination } from "./DataTableManualPagination";
import { DataTablePagination } from "./DataTablePagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[] | Paginated<TData>;
	initialState?: InitialTableState;
	toolbar?: React.JSX.Element;
	getRowId?: TableOptions<TData>["getRowId"];
}

export function DataTable<TData, TValue>({
	columns,
	data,
	initialState,
	toolbar,
	getRowId,
}: DataTableProps<TData, TValue>) {
    const isPaginated = !Array.isArray(data);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{},
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);


	const table = useReactTable({
		data: isPaginated ? data.data : data,
		columns,
		state: {
			sorting,
			columnVisibility,
			columnFilters,
		},
		initialState,
		manualPagination: isPaginated,
		enableRowSelection: true,
		getRowId,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: isPaginated
			? undefined
			: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});


	const headerGroups = table.getHeaderGroups();
	const columnsSpan = headerGroups[headerGroups.length - 1].headers.length;

	return (
		<div className="space-y-4">
			{toolbar ? toolbar : null}

			<div className="rounded-md border">
				<Table className="relative">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											className={cn(
												"whitespace-nowrap",
												header.colSpan > 1
													? "text-center"
													: "",
											)}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columnsSpan}
									className="h-24 text-center"
								>
									No hay resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{isPaginated ? (
				<DataTableManualPagination paginatedData={data} />
			) : (
				<DataTablePagination table={table} />
			)}

		</div>
	);
}
