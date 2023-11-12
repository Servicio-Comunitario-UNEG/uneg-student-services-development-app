import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { Input } from "@/Components/ui/input";

import { StudentsPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters } = usePage<StudentsPageProps>().props;

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

	// Updates the roles query,
	const onSelectRoleChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						roles: Array.from(selectedValues),
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
			onSelectRoleChange.cancel();
		};
	}, [onSearchTermChange, onSelectRoleChange]);

	return (
		<Input
			id="students-search"
			defaultValue={filters.search}
			type="search"
			placeholder="Buscar por nombre, cédula, correo o teléfono"
			onChange={onSearchTermChange}
			className="h-8 w-full sm:max-w-xs"
		/>
	);
}
