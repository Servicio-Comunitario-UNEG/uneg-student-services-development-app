import { Input } from "@/Components/ui/input";
import { router, usePage } from "@inertiajs/react";
import { useEffect, type ChangeEvent } from "react";
import { UserPageProps } from "../Index";
import debounce from "lodash.debounce";

export function DataTableToolbar() {
	const { filters } = usePage<UserPageProps>().props;

	const onSearchTermChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
		router.get(
			route("users.index"),
			{
				search: e.target.value,
			},
			{
				preserveState: true,
				replace: true,
			},
		);
	}, 500);

	useEffect(() => {
		return () => {
			onSearchTermChange.cancel();
		};
	}, [onSearchTermChange]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					defaultValue={filters.search}
					type="search"
					placeholder="Buscar por nombre o correo"
					onChange={onSearchTermChange}
					className="h-8 w-full sm:max-w-xs"
				/>
			</div>
		</div>
	);
}
