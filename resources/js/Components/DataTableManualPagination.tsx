import { Link, router } from "@inertiajs/react";
import debounce from "lodash.debounce";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { useEffect, useMemo } from "react";

import { Paginated } from "@/types";

import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export function DataTableManualPagination<TData>({
	paginatedData,
}: {
	paginatedData: Paginated<TData>;
}) {
	const canPreviousPage = Boolean(paginatedData.prev_page_url);
	const canNextPage = Boolean(paginatedData.next_page_url);
	const totalPages = Math.ceil(paginatedData.total / paginatedData.per_page);

	// Update per page count.
	const onPerPageChange = useMemo(
		() =>
			debounce((value: string) => {
				const routeName = route().current();

				if (!routeName) return;

				const url = new URL(paginatedData.first_page_url).searchParams;
				url.set("per_page", value);

				router.get(route(routeName), Object.fromEntries(url), {
					preserveState: true,
					replace: true,
				});
			}, 300),
		[paginatedData.first_page_url],
	);

	useEffect(() => {
		return () => {
			onPerPageChange.cancel();
		};
	}, [onPerPageChange]);

	return (
		<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
			<div className="flex items-center justify-between space-x-2 sm:justify-start">
				<p className="text-sm font-medium">Filas por página</p>

				<Select
					value={`${paginatedData.per_page}`}
					onValueChange={onPerPageChange}
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={paginatedData.per_page} />
					</SelectTrigger>
					<SelectContent side="top">
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="flex justify-between sm:justify-start sm:gap-2">
				<div className="flex items-center text-sm font-medium">
					Página {paginatedData.current_page} de {totalPages}
				</div>

				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						asChild
					>
						<Link
							href={paginatedData.first_page_url}
							disabled={!canPreviousPage}
							as="button"
						>
							<span className="sr-only">
								Ir a la primera página
							</span>
							<ChevronsLeft className="h-4 w-4" />
						</Link>
					</Button>

					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						disabled={!canPreviousPage}
						asChild
					>
						<Link
							href={paginatedData.prev_page_url ?? ""}
							as="button"
						>
							<span className="sr-only">
								Ir a la página anterior
							</span>
							<ChevronLeft className="h-4 w-4" />
						</Link>
					</Button>

					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						disabled={!canNextPage}
						asChild
					>
						<Link
							href={paginatedData.next_page_url ?? ""}
							as="button"
						>
							<span className="sr-only">
								Ir a la siguiente página
							</span>

							<ChevronRight className="h-4 w-4" />
						</Link>
					</Button>

					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						disabled={!canNextPage}
						asChild
					>
						<Link href={paginatedData.last_page_url} as="button">
							<span className="sr-only">
								Ir a la última página
							</span>
							<ChevronsRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
