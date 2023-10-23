import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { Input } from "@/Components/ui/input";

import { HeadquarterPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters } = usePage<HeadquarterPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("headquarters.index"),
					{
						...filters,
						search: e.target.value,
					},
					{
						preserveState: true,
						replace: true,
						only: ["headquarters", "filters"],
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
				id="headquarters-search"
				defaultValue={filters.search}
				type="search"
				placeholder="Buscar por nombre"
				onChange={onSearchTermChange}
				className="h-8 w-full sm:max-w-xs"
			/>
		</div>
	);
}
