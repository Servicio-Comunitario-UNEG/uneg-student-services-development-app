import { Head, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useEffect, FormEventHandler } from "react";

import GuestLayout from "@/Layouts/GuestLayout";

import PasswordField from "@/Components/PasswordField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function ResetPassword({
	token,
	email,
}: {
	token: string;
	email: string;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		token: token,
		email: email,
		password: "",
		password_confirmation: "",
	});

	useEffect(() => {
		return () => {
			reset("password", "password_confirmation");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.store"));
	};

	return (
		<GuestLayout title="Reestablece tu Contraseña">
			<Head title="Reestablecer Contraseña" />

			<form onSubmit={submit} className="space-y-6">
				<div className="space-y-4">
					<TextField
						id="email"
						labelProps={{
							children: "Correo electrónico",
						}}
						inputProps={{
							type: "email",
							placeholder: "ej: johndoe@gmail.com",
							value: data.email,
							autoComplete: "username",
							autoFocus: true,
							required: true,
							onChange: (e) => setData("email", e.target.value),
						}}
						errorMessage={errors.email}
					/>

					<PasswordField
						id="password"
						labelProps={{
							children: "Contraseña",
						}}
						inputProps={{
							value: data.password,
							autoComplete: "new-password",
							required: true,
							onChange: (e) => {
								setData("password", e.target.value);
							},
						}}
						errorMessage={errors.password}
					/>

					<PasswordField
						id="password_confirmation"
						labelProps={{
							children: "Confirmar contraseña",
						}}
						inputProps={{
							value: data.password_confirmation,
							autoComplete: "new-password",
							required: true,
							onChange: (e) => {
								setData(
									"password_confirmation",
									e.target.value,
								);
							},
						}}
						errorMessage={errors.password_confirmation}
					/>
				</div>

				<Button className="w-full" disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Reestablecer contraseña</span>
				</Button>
			</form>
		</GuestLayout>
	);
}
