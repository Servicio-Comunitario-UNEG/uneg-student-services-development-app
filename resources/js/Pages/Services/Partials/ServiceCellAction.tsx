import { Link, usePage } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { PageProps } from "@/types";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useGate } from "@/hooks/useGate";

import type { ServiceWithUserAndStudent } from "../Index";

export default function SupportCellAction({
	row,
}: CellContext<ServiceWithUserAndStudent, unknown>) {
	const { user } = usePage<PageProps>().props.auth;
	const gate = useGate();
	const support = row.original;

	const canEdit =
		(gate.allows("edit services") && support.user_id === user.id) ||
		gate.allows("edit any service");

	const canDelete =
		(gate.allows("delete services") && support.user_id === user.id) ||
		gate.allows("delete any service");

	// Must have at least one permission.
	if (!gate.allows("view services") && !canEdit && !canDelete) {
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
					{gate.allows("view services") ? (
						<DropdownMenuItem asChild>
							<Link href={route("services.show", support.id)}>
								<Eye className="mr-2 h-4 w-4" />
								<span>Ver</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{canEdit ? (
						<DropdownMenuItem asChild>
							<Link href={route("services.edit", support.id)}>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{canDelete ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route("services.destroy", support.id)}
								onClick={(e) => {
									if (
										!confirm("¿Desea eliminar el servicio?")
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
