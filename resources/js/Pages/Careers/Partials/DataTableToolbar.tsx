import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { Input } from "@/Components/ui/input";

import { CareerPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters } = usePage<CareerPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("careers.index"),
					{
						...filters,
						page: 1,
						search: e.target.value,
					},
					{
						preserveState: true,
						replace: true,
						only: ["careers", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	useEffect(() => {
		return () => {
			onSearchTermChange.cancel();
		};
	}, [onSearchTermChange]);

	return (
		<div className="flex flex-1 items-center space-x-2">
			<Input
				id="careers-search"
				defaultValue={filters.search}
				type="search"
				placeholder="Buscar por nombre"
				onChange={onSearchTermChange}
				className="h-8 w-full sm:max-w-xs"
			/>
		</div>
	);
}
