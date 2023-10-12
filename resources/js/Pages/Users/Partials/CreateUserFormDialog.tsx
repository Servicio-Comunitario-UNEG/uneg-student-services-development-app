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
import { Headquarter, Role } from "@/types";

export default function CreateUserFormDialog({
	headquarters,
	roles,
}: {
	headquarters: Headquarter[];
	roles: Role[];
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
						email: "",
						password: "",
						role_name: "",
					}}
					onSuccess={() => setOpen(false)}
					callToAction="Crear"
					headquarters={headquarters}
					roles={roles}
				/>
			</DialogContent>
		</Dialog>
	);
}
