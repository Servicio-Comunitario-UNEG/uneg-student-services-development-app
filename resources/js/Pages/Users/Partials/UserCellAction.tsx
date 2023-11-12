import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { type User } from "@/types";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useGate } from "@/hooks/useGate";

export default function UserCellAction({ row }: CellContext<User, unknown>) {
	const gate = useGate();
	const user = row.original;

	if (!gate.any(["edit users", "delete users"])) return null;

	return (
		<div className="flex justify-end">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Abrir menú</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					{gate.allows("edit users") ? (
						<DropdownMenuItem asChild>
							<Link href={route("users.edit", user.id)}>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("delete users") ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route("users.destroy", user.id)}
								onClick={(e) => {
									if (
										!confirm("¿Desea eliminar el usuario?")
									) {
										e.preventDefault();
									}
								}}
								method="delete"
								preserveScroll
							>
								<Trash className="mr-2 h-4 w-4" />

								<span>Eliminar</span>
							</Link>
						</DropdownMenuItem>
					) : null}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
