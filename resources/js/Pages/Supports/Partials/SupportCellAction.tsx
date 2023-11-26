import { Link, usePage } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { PageProps, Role } from "@/types";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useGate } from "@/hooks/useGate";

import type { SupportWithUserAndStudent } from "../Index";

export default function SupportCellAction({
	row,
}: CellContext<SupportWithUserAndStudent, unknown>) {
	const { user } = usePage<PageProps>().props.auth;
	const gate = useGate();
	const support = row.original;

	// Allowed roles to override the author only.
	const roles: Role["name"][] = ["admin", "coordinator"];

	// Wether is the author of this support or has an authorized role.
	const isAuthorized =
		user.id === support.user_id || roles.includes(user.current_role.name);

	// Must have at least one permission.
	if (!gate.any(["view supports", "edit supports", "delete supports"])) {
		return null;
	}

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
					{gate.allows("view supports") ? (
						<DropdownMenuItem asChild>
							<Link href={route("supports.show", support.id)}>
								<Eye className="mr-2 h-4 w-4" />
								<span>Ver</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("edit supports") && isAuthorized ? (
						<DropdownMenuItem asChild>
							<Link href={route("supports.edit", support.id)}>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("delete supports") && isAuthorized ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route("supports.destroy", support.id)}
								onClick={(e) => {
									if (!confirm("¿Desea eliminar el apoyo?")) {
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
