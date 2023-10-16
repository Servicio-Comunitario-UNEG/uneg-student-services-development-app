import { Head, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useEffect, FormEventHandler } from "react";

import GuestLayout from "@/Layouts/GuestLayout";

import PasswordField from "@/Components/PasswordField";
import { Button } from "@/Components/ui/button";

export default function ConfirmPassword() {
	const { data, setData, post, processing, errors, reset } = useForm({
		password: "",
	});

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.confirm"));
	};

	return (
		<GuestLayout
			title="Confirma tu Contraseña"
			description="Este es un área de segura de la aplicación. Por favor, confirma tu contraseña antes de continuar."
		>
			<Head title="Confirmar Contraseña" />

			<form onSubmit={submit} className="space-y-6">
				<PasswordField
					id="password"
					labelProps={{
						children: "Contraseña",
					}}
					inputProps={{
						value: data.password,
						autoFocus: true,
						required: true,
						onChange: (e) => {
							setData("password", e.target.value);
						},
					}}
					errorMessage={errors.password}
				/>

				<Button className="w-full" disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Confirmar</span>
				</Button>
			</form>
		</GuestLayout>
	);
}
