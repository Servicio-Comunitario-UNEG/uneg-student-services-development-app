import { type CellContext } from "@tanstack/react-table";
import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import type { Career } from "@/types";
import { Link } from "@inertiajs/react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";

export default function CareerCellAction({
	row,
}: CellContext<Career, unknown>) {
	const [open, setOpen] = useState(false);
	const career = row.original;

	return (
		<div className="flex justify-end">
			<Dialog open={open} onOpenChange={setOpen}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Abrir menú</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DialogTrigger asChild>
							<DropdownMenuItem>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</DropdownMenuItem>
						</DialogTrigger>

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
							>
								<Trash className="mr-2 h-4 w-4" />

								<span>Eliminar</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Editar carrera</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
