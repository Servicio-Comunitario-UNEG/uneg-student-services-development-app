import { Link } from "@inertiajs/react";
import { type CellContext } from "@tanstack/react-table";
import { MoreHorizontal, Pencil } from "lucide-react";

import { Semester } from "@/types";

import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import { useGate } from "@/hooks/useGate";

export default function SemesterCellAction({
	row,
}: CellContext<Semester, unknown>) {
	const gate = useGate();
	const semester = row.original;

	if (!gate.allows("edit semesters")) return null;

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
						<Link href={route("semesters.edit", semester.id)}>
							<Pencil className="mr-2 h-4 w-4" />
							<span>Editar</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
