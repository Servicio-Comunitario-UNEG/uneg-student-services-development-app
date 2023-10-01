import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/TextField";
import PasswordField from "@/Components/PasswordField";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";

export default function Register() {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		email: "",
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

		post(route("register"));
	};

	return (
		<GuestLayout title="Crea tu Cuenta">
			<Head title="Registro" />

			<Button
				variant="ghost"
				className="absolute right-4 top-4 md:right-6 md:top-6"
				asChild
			>
				<Link href={route("login")}>Iniciar Sesión</Link>
			</Button>

			<form onSubmit={submit} className="space-y-6">
				<div className="space-y-4">
					<TextField
						id="name"
						labelProps={{
							children: "Nombre",
						}}
						inputProps={{
							placeholder: "ej: John Doe",
							value: data.name,
							autoComplete: "name",
							autoFocus: true,
							onChange: (e) => setData("name", e.target.value),
							required: true,
						}}
						errorMessage={errors.name}
					/>

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
							onChange: (e) => setData("email", e.target.value),
							required: true,
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
							onChange: (e) => {
								setData("password", e.target.value);
							},
							required: true,
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
							onChange: (e) => {
								setData(
									"password_confirmation",
									e.target.value,
								);
							},
							required: true,
						}}
						errorMessage={errors.password_confirmation}
					/>
				</div>

				<Button className="w-full" disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Crear Cuenta</span>
				</Button>
			</form>
		</GuestLayout>
	);
}
