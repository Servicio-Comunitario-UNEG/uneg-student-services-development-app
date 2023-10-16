import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { PageProps } from "@/types";

import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card";

export default function UpdateProfileInformation({
	mustVerifyEmail,
	status,
	className = "",
}: {
	mustVerifyEmail: boolean;
	status?: string;
	className?: string;
}) {
	const user = usePage<PageProps>().props.auth.user;

	const { data, setData, patch, errors, processing, recentlySuccessful } =
		useForm({
			name: user.name,
			email: user.email,
		});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		patch(route("profile.update"));
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Información del Perfil</CardTitle>

				<CardDescription>
					Actualiza la información del perfil de tu cuenta y dirección
					de correo electrónico.
				</CardDescription>
			</CardHeader>

			<CardContent className={className}>
				<form onSubmit={submit} className="space-y-6">
					<div className="space-y-4">
						<TextField
							id="name"
							labelProps={{
								children: "Nombre",
							}}
							inputProps={{
								value: data.name,
								onChange: (e) =>
									setData("name", e.target.value),
								required: true,
								autoFocus: true,
								autoComplete: "name",
							}}
							errorMessage={errors.name}
						/>

						<TextField
							id="email"
							labelProps={{
								children: "Correo Electrónico",
							}}
							inputProps={{
								type: "email",
								value: data.email,
								onChange: (e) =>
									setData("email", e.target.value),
								required: true,
								autoComplete: "username",
							}}
							errorMessage={errors.email}
						/>
					</div>

					{mustVerifyEmail && user.email_verified_at === null && (
						<div>
							<p className="text-sm text-foreground">
								Tu correo electrónico no está verificado.{" "}
								<Link
									href={route("verification.send")}
									method="post"
									as="button"
									className="text-muted-foreground underline hover:text-muted-foreground/80"
								>
									Reenviar correo de verificación
								</Link>
								.
							</p>

							{status === "verification-link-sent" ? (
								<div className="text-sm font-medium text-green-600">
									Un nuevo enlace de verificación ha sido
									enviado a tu dirección de correo.
								</div>
							) : null}
						</div>
					)}

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
