import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";

import CreateOrEditCareerForm from "./CreateOrEditCareerForm";

export default function CreateCareerFormDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Plus className="mr-2 h-4 w-4" />

					<span className="whitespace-nowrap">Agregar carrera</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Crea una nueva carrera</DialogTitle>
				</DialogHeader>

				<CreateOrEditCareerForm
					initialValues={{
						name: "",
					}}
					onSuccess={() => setOpen(false)}
					callToAction="Agregar carrera"
				/>
			</DialogContent>
		</Dialog>
	);
}
