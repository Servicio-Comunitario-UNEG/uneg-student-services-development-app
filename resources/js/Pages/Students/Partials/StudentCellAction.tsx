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

import { StudentWithCareerHeadquarter } from "../Index";

export default function StudentCellAction({
	row,
}: CellContext<StudentWithCareerHeadquarter, unknown>) {
	const student = row.original;
	const gate = useGate();

	if (!gate.any(["view students", "edit students", "delete students"]))
		return null;

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
					{gate.allows("view students") ? (
						<DropdownMenuItem asChild>
							<Link href={route("students.show", student.id)}>
								<Eye className="mr-2 h-4 w-4" />
								<span>Ver</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("edit students") ? (
						<DropdownMenuItem asChild>
							<Link href={route("students.edit", student.id)}>
								<Pencil className="mr-2 h-4 w-4" />
								<span>Editar</span>
							</Link>
						</DropdownMenuItem>
					) : null}

					{gate.allows("delete students") ? (
						<DropdownMenuItem className="text-destructive" asChild>
							<Link
								className="w-full"
								as="button"
								href={route("students.destroy", student.id)}
								onClick={(e) => {
									if (
										!confirm(
											"¿Desea eliminar el estudiante?",
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
