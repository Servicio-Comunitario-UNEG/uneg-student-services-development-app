import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";

import { type User } from "@/types";

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

import { useGate } from "@/hooks/useGate";

import CreateOrEditUserForm from "./CreateOrEditUserForm";

export default function UserCellAction({ row }: CellContext<User, unknown>) {
	const [open, setOpen] = useState(false);
	const gate = useGate();
	const user = row.original;

	if (!gate.any(["edit users", "delete users"])) return null;

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
						{gate.allows("edit users") ? (
							<DialogTrigger asChild>
								<DropdownMenuItem>
									<Pencil className="mr-2 h-4 w-4" />
									<span>Editar</span>
								</DropdownMenuItem>
							</DialogTrigger>
						) : null}

						{gate.allows("delete users") ? (
							<DropdownMenuItem
								className="text-destructive"
								asChild
							>
								<Link
									className="w-full"
									as="button"
									href={route("users.destroy", user.id)}
									onClick={(e) => {
										if (
											!confirm(
												"¿Desea eliminar el usuario?",
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

				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Editar usuario</DialogTitle>
					</DialogHeader>

					<CreateOrEditUserForm
						initialValues={user}
						onSuccess={() => setOpen(false)}
						callToAction="Editar"
						isUpdate
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
