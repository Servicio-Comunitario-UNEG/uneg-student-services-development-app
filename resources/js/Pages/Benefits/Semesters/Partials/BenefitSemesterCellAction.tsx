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

import { BenefitSemesterWithRelation } from "../Index";

export default function BenefitSemesterCellAction({
	row,
}: CellContext<BenefitSemesterWithRelation, unknown>) {
	const benefitSemester = row.original;

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
						<Link
							href={route(
								"benefits-semesters.show",
								benefitSemester.id,
							)}
						>
							<Eye className="mr-2 h-4 w-4" />
							<span>Ver</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Link
							href={route(
								"benefits-semesters.edit",
								benefitSemester.id,
							)}
						>
							<Pencil className="mr-2 h-4 w-4" />
							<span>Editar</span>
						</Link>
					</DropdownMenuItem>

					<DropdownMenuItem className="text-destructive" asChild>
						<Link
							className="w-full"
							as="button"
							href={route(
								"benefits-semesters.destroy",
								benefitSemester.id,
							)}
							onClick={(e) => {
								if (
									!confirm(
										"¿Desea desasignar el beneficio al semestre?",
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
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}