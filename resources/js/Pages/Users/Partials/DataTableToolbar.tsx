import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { Input } from "@/Components/ui/input";

import { UserPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters, roles } = usePage<UserPageProps>().props;

	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("users.index"),
					{
						search: e.target.value,
						roles: filters.roles,
					},
					{
						preserveState: true,
						replace: true,
						only: ["users", "filters"],
					},
				);
			}, 500),
		[filters.roles],
	);

	const onSelectRoleChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("users.index"),
					{
						search: filters.search,
						roles: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["users", "filters"],
					},
				);
			}, 500),
		[filters.search],
	);

	useEffect(() => {
		return () => {
			onSearchTermChange.cancel();
			onSelectRoleChange.cancel();
		};
	}, [onSearchTermChange, onSelectRoleChange]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					id="users-search"
					defaultValue={filters.search}
					type="search"
					placeholder="Buscar por nombre o correo"
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
		</div>
	);
}
