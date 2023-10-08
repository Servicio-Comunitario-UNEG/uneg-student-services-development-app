import { type CellContext } from "@tanstack/react-table";
import { Button } from "@/Components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Headquarter } from "@/types";
import { Link } from "@inertiajs/react";
import { MoreHorizontal, Trash } from "lucide-react";

export default function HeadquarterCellAction({
	row,
}: CellContext<Headquarter, unknown>) {
	const headquarter = row.original;

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
					<DropdownMenuItem className="text-destructive" asChild>
						<Link
							className="w-full"
							as="button"
							href={route("headquarters.destroy", headquarter.id)}
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
		</div>
	);
}
