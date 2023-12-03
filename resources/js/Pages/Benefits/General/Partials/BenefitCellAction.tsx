import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Benefit } from "@/types";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function BenefitCellAction({
	row,
}: CellContext<Benefit, unknown>) {
	const benefit = row.original;

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
						<Link href={route("benefits.edit", benefit.id)}>
							<Pencil className="mr-2 h-4 w-4" />
							<span>Editar</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem className="text-destructive" asChild>
						<Link
							className="w-full"
							as="button"
							href={route("benefits.destroy", benefit.id)}
							onClick={(e) => {
								if (!confirm("¿Desea eliminar el beneficio?")) {
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
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
