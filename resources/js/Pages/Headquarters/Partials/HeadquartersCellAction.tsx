import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash, UserX } from "lucide-react";
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

import { HeadquarterPageProps } from "../Index";
import EditHeadquarterForm from "./EditHeadquarterForm";

export default function HeadquarterCellAction({
	row,
}: CellContext<HeadquarterPageProps["headquarters"][number], unknown>) {
	const [open, setOpen] = useState(false);
	const headquarter = row.original;

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

						{headquarter.user ? (
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
								>
									<UserX className="mr-2 h-4 w-4" />

									<span>Desasignar representante</span>
								</Link>
							</DropdownMenuItem>
						) : null}

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
							>
								<Trash className="mr-2 h-4 w-4" />

								<span>Eliminar</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Editar sede</DialogTitle>
					</DialogHeader>

					<EditHeadquarterForm
						initialValues={headquarter}
						onSuccess={() => setOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
