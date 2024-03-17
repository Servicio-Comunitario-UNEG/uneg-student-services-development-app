import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useGate } from "@/hooks/useGate";

import { CareerWithHeadquarters } from "../Index";

export default function CareerCellAction({
	row,
}: CellContext<CareerWithHeadquarters, unknown>) {
	const gate = useGate();
	const career = row.original;

	if (!gate.any(["edit careers", "delete careers"])) return null;

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
					<DropdownMenuItem asChild>
						<Link href={route("careers.show", career.id)}>
							<Eye className="mr-2 h-4 w-4" />
							<span>Ver</span>
						</Link>
					</DropdownMenuItem>

					{gate.allows("edit careers") ? (
						<DropdownMenuItem asChild>
							<Link href={route("careers.edit", career.id)}>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("delete careers") ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route("careers.destroy", career.id)}
								onClick={(e) => {
									if (
										!confirm("¿Desea eliminar la carrera?")
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
