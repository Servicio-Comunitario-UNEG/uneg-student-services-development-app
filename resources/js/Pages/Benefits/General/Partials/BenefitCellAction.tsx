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

import { useGate } from "@/hooks/useGate";

export default function BenefitCellAction({
	row,
}: CellContext<Benefit, unknown>) {
	const benefit = row.original;
	const gate = useGate();

	if (!gate.any(["edit benefits", "delete benefits"])) return null;

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
					{gate.allows("edit benefits") ? (
						<DropdownMenuItem asChild>
							<Link href={route("benefits.edit", benefit.id)}>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("delete benefits") ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route("benefits.destroy", benefit.id)}
								onClick={(e) => {
									if (
										!confirm(
											"¿Desea eliminar el beneficio?",
										)
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
