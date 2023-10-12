import { Input } from "@/Components/ui/input";
import { router, usePage } from "@inertiajs/react";
import { ChangeEvent, useState } from "react";
import { UserPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters } = usePage<UserPageProps>().props;
	const [searchTerm, setSearchTerm] = useState(filters.search);

	const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);

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
	};

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center space-x-2">
				<Input
					type="search"
					placeholder="Buscar por nombre o correo"
					value={searchTerm}
					onChange={onSearchTermChange}
					className="h-8 w-full sm:max-w-xs"
				/>
			</div>
		</div>
	);
}
