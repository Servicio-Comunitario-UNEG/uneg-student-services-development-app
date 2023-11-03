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

import CreateOrEditStudentForm from "./CreateOrEditStudentForm";

export default function CreateStudentFormDialog() {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Plus className="mr-2 h-4 w-4" />

					<span className="whitespace-nowrap">Crear</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Crear estudiante</DialogTitle>
				</DialogHeader>

				<CreateOrEditStudentForm
					initialValues={{
						address: "",
						birth_date: "",
						cell_phone: "",
						email: "",
						first_name: "",
						identity_card: {
							nationality: "V",
							serial: "",
						},
						last_name: "",
						second_last_name: "",
						second_name: "",
						sex: "M",
						is_disabled: false,
						is_indigenous: false,
						room_phone: "",
						situation: "",
						graffar: null,
					}}
					onSuccess={() => setOpen(false)}
					callToAction="Crear"
				/>
			</DialogContent>
		</Dialog>
	);
}
