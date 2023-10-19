import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { Input } from "@/Components/ui/input";

import { UserPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters, roles } = usePage<UserPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("users.index"),
					{
						...filters,
						search: e.target.value,
					},
					{
						preserveState: true,
						replace: true,
						only: ["users", "filters"],
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
					route("users.index"),
					{
						...filters,
						roles: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["users", "filters"],
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
		<div className="flex flex-1 items-center space-x-2">
			<Input
				id="users-search"
				defaultValue={filters.search}
				type="search"
				placeholder="Buscar por nombre, cédula o correo"
				onChange={onSearchTermChange}
				className="h-8 w-full sm:max-w-xs"
			/>

			<DataTableFacetedFilter
				defaultValues={filters.roles}
				onChange={onSelectRoleChange}
				title="Roles"
				options={roles.map((role) => ({
					label: role.description,
					value: role.name,
				}))}
			/>
		</div>
	);
}
