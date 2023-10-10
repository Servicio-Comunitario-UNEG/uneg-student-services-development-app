import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import CreateOrEditHeadquarterForm from "./CreateOrEditHeadquarterForm";
import { useState } from "react";
import { Plus } from "lucide-react";

export default function CreateHeadquarterFormDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Plus className="mr-2 h-4 w-4" />

					<span className="whitespace-nowrap">Agregar sede</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Crea una nueva sede</DialogTitle>
				</DialogHeader>

				<CreateOrEditHeadquarterForm
					initialValues={{
						name: "",
					}}
					onSuccess={() => setOpen(false)}
					callToAction="Agregar sede"
				/>
			</DialogContent>
		</Dialog>
	);
}
