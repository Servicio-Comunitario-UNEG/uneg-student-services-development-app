import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { Input } from "@/Components/ui/input";

import { StudentsPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters, careers, headquarters } =
		usePage<StudentsPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						search: e.target.value,
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the careers query,
	const onSelectCareerChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						careers: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the headquarters query,
	const onSelectHeadquarterChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						headquarters: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	useEffect(() => {
		return () => {
			onSearchTermChange.cancel();
			onSelectCareerChange.cancel();
			onSelectHeadquarterChange.cancel();
		};
	}, [onSearchTermChange, onSelectCareerChange, onSelectHeadquarterChange]);

	return (
		<div className="flex flex-1 items-center space-x-2">
			<Input
				id="students-search"
				defaultValue={filters.search}
				type="search"
				placeholder="Buscar por nombre, cédula, correo o teléfono"
				onChange={onSearchTermChange}
				className="h-8 w-full sm:max-w-xs"
			/>

			<DataTableFacetedFilter
				defaultValues={filters.careers}
				onChange={onSelectCareerChange}
				title="Carreras"
				options={careers.map((career) => ({
					label: career.name,
					value: String(career.id),
				}))}
			/>

			<DataTableFacetedFilter
				defaultValues={filters.headquarters}
				onChange={onSelectHeadquarterChange}
				title="Sedes"
				options={headquarters.map((headquarter) => ({
					label: headquarter.name,
					value: String(headquarter.id),
				}))}
			/>
		</div>
	);
}
