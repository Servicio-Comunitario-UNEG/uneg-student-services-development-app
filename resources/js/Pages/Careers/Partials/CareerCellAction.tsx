import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import type { CareerWithHeadquarters } from "../Index";
import EditCareerForm from "./EditCareerForm";

export default function CareerCellAction({
	row,
}: CellContext<CareerWithHeadquarters, unknown>) {
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
								preserveScroll
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

					<EditCareerForm
						initialValues={career}
						onSuccess={() => setOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
