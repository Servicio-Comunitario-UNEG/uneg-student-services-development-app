import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { Input } from "@/Components/ui/input";

import { HeadquarterPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters, cities } = usePage<HeadquarterPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("headquarters.index"),
					{
						...filters,
						page: 1,
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

	// Updates the cities query,
	const onSelectCityChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("headquarters.index"),
					{
						...filters,
						page: 1,
						cities: Array.from(selectedValues),
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
			onSelectCityChange.cancel();
		};
	}, [onSearchTermChange, onSelectCityChange]);

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

			<DataTableFacetedFilter
				defaultValues={filters.cities}
				onChange={onSelectCityChange}
				title="Ciudades"
				options={cities.map((city) => ({
					label: city.name,
					value: String(city.id),
				}))}
			/>
		</div>
	);
}
