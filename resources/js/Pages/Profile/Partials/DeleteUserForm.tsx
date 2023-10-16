import { useForm } from "@inertiajs/react";
import { useState, type FormEventHandler } from "react";

import PasswordField from "@/Components/PasswordField";
import { Button } from "@/Components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/Components/ui/dialog";

export default function DeleteUserForm({
	className = "",
}: {
	className?: string;
}) {
	const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

	const {
		data,
		setData,
		delete: destroy,
		processing,
		reset,
		errors,
	} = useForm({
		password: "",
	});

	const deleteUser: FormEventHandler = (e) => {
		e.preventDefault();

		destroy(route("profile.destroy"), {
			preserveScroll: true,
			onSuccess: () => closeDialog(),
			onFinish: () => reset(),
		});
	};

	const closeDialog = () => {
		setConfirmingUserDeletion(false);
		reset();
	};

	const onOpenChange = (open: boolean) => {
		open ? setConfirmingUserDeletion(true) : closeDialog();
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Eliminar cuenta</CardTitle>

				<CardDescription>
					Una vez elimines tu cuenta, todos los recursos y datos serán
					borrados de forma permanente.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Dialog
					open={confirmingUserDeletion}
					onOpenChange={onOpenChange}
				>
					<DialogTrigger asChild>
						<Button variant="destructive">Eliminar Cuenta</Button>
					</DialogTrigger>

					<DialogContent className={className}>
						<DialogHeader>
							<DialogTitle>
								¿Estás seguro de eliminar tu cuenta?
							</DialogTitle>

							<DialogDescription>
								Una vez tu cuenta este eliminada, todos los
								recursos y datos asociados serán eliminados de
								forma permanente.
							</DialogDescription>
						</DialogHeader>

						<form className="space-y-6" onSubmit={deleteUser}>
							<PasswordField
								id="password"
								labelProps={{ children: "Contraseña" }}
								inputProps={{
									value: data.password,
									onChange: (e) =>
										setData("password", e.target.value),
									autoFocus: true,
									required: true,
								}}
								errorMessage={errors.password}
							/>

							<Button variant="destructive" disabled={processing}>
								Eliminar
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}
