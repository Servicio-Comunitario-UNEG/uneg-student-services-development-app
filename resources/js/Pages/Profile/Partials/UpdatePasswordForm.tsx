import type { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";
import PasswordField from "@/Components/PasswordField";
import { Button } from "@/Components/ui/button";

export default function UpdatePasswordForm({
	className = "",
}: {
	className?: string;
}) {
	const {
		data,
		setData,
		errors,
		put,
		reset,
		processing,
		recentlySuccessful,
	} = useForm({
		current_password: "",
		password: "",
		password_confirmation: "",
	});

	const updatePassword: FormEventHandler = (e) => {
		e.preventDefault();

		put(route("password.update"), {
			preserveScroll: true,
			onSuccess: () => reset(),
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Actualizar contraseña</CardTitle>

				<CardDescription>
					Asegura tu cuenta utilizando una contraseña larga y
					aleatoria para mantenerte seguro.
				</CardDescription>
			</CardHeader>

			<CardContent className={className}>
				<form onSubmit={updatePassword} className="space-y-6">
					<div className="space-y-6">
						<PasswordField
							id="current_password"
							labelProps={{ children: "Contraseña Actual" }}
							inputProps={{
								value: data.current_password,
								onChange: (e) => {
									setData("current_password", e.target.value);
								},
								autoComplete: "current-password",
							}}
							errorMessage={errors.current_password}
						/>

						<PasswordField
							id="password"
							labelProps={{ children: "Nueva Contraseña" }}
							inputProps={{
								value: data.password,
								onChange: (e) => {
									setData("password", e.target.value);
								},
								autoComplete: "new-password",
							}}
							errorMessage={errors.password}
						/>

						<PasswordField
							id="password_confirmation"
							labelProps={{ children: "Confirmar contraseña" }}
							inputProps={{
								value: data.password_confirmation,
								onChange: (e) =>
									setData(
										"password_confirmation",
										e.target.value,
									),
								autoComplete: "new-password",
							}}
							errorMessage={errors.password_confirmation}
						/>
					</div>

					<div className="flex items-center gap-4">
						<Button disabled={processing}>Guardar</Button>

						<Transition
							show={recentlySuccessful}
							enter="transition ease-in-out"
							enterFrom="opacity-0"
							leave="transition ease-in-out"
							leaveTo="opacity-0"
						>
							<p className="text-sm text-foreground">Guardado.</p>
						</Transition>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
