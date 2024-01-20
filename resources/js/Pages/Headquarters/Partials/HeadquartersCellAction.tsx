import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash, UserX } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useGate } from "@/hooks/useGate";

import { HeadquarterWithRepresentative } from "../Index";

export default function HeadquarterCellAction({
	row,
}: CellContext<HeadquarterWithRepresentative, unknown>) {
	const gate = useGate();
	const headquarter = row.original;

	if (!gate.any(["edit headquarters", "delete headquarters"])) return null;

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
					{gate.allows("edit headquarters") ? (
						<DropdownMenuItem asChild>
							<Link
								href={route(
									"headquarters.edit",
									headquarter.id,
								)}
							>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{headquarter.user && gate.allows("edit headquarters") ? (
						<DropdownMenuItem asChild>
							<Link
								className="w-full"
								as="button"
								href={route(
									"headquarters.unassign",
									headquarter.id,
								)}
								onClick={(e) => {
									if (
										!confirm(
											"¿Desea desasignar al representante?",
										)
									) {
										e.preventDefault();
									}
								}}
								method="put"
								preserveScroll
							>
								<UserX className="mr-2 h-4 w-4" />

								<span>Desasignar representante</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("delete headquarters") ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route(
									"headquarters.destroy",
									headquarter.id,
								)}
								onClick={(e) => {
									if (!confirm("¿Desea eliminar la sede?")) {
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
