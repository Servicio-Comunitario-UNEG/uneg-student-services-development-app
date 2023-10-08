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
import { Building2 } from "lucide-react";

export default function CreateHeadquarterFormDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Building2 className="mr-2 h-4 w-4" />

					<span>Crear Sede</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Crear Sede</DialogTitle>
				</DialogHeader>

				<CreateOrEditHeadquarterForm
					initialValues={{
						name: "",
						address: "",
					}}
					onSuccess={() => setOpen(false)}
					callToAction="Crear"
				/>
			</DialogContent>
		</Dialog>
	);
}
