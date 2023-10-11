import { Button } from "@/Components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { Plus } from "lucide-react";
import CreateOrEditUserForm from "./CreateOrEditUserForm";
import { Headquarter } from "@/types";

export default function CreateUserFormDialog({
	headquarters,
}: {
	headquarters: Headquarter[];
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">
					<Plus className="mr-2 h-4 w-4" />

					<span className="whitespace-nowrap">Crear usuario</span>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Crea un nuevo usuario</DialogTitle>
				</DialogHeader>

				<CreateOrEditUserForm
					initialValues={{
						name: "",
					}}
					onSuccess={() => setOpen(false)}
					callToAction="Crear"
					headquarters={headquarters}
				/>
			</DialogContent>
		</Dialog>
	);
}
