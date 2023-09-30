import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/TextField";
import { CheckboxField } from "@/Components/CheckboxField";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";
import PasswordField from "@/Components/PasswordField";

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword: boolean;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("login"));
	};

	return (
		<GuestLayout title="Inicio de Sesión">
			<Head title="Inicio de Sesión" />

			<Button
				variant="ghost"
				className="absolute right-4 top-4 md:right-6 md:top-6"
				asChild
			>
				<Link href={route("register")}>Registro</Link>
			</Button>

			{status && (
				<div className="mb-4 text-sm font-medium text-green-600">
					{status}
				</div>
			)}

			<form onSubmit={submit} className="space-y-6">
				<div className="space-y-4">
					<TextField
						id="email"
						labelProps={{
							children: "Email",
						}}
						inputProps={{
							type: "email",
							placeholder: "ej: johndoe@gmail.com",
							value: data.email,
							autoComplete: "username",
							autoFocus: true,
							onChange: (e) => setData("email", e.target.value),
						}}
						errorMessage={errors.email}
					/>

					<PasswordField
						id="password"
						labelProps={{
							children: "Contraseña",
						}}
						canResetPassword={canResetPassword}
						inputProps={{
							value: data.password,
							autoComplete: "current-password",
							onChange: (e) => {
								setData("password", e.target.value);
							},
						}}
						errorMessage={errors.password}
					/>

					<CheckboxField
						id="remember"
						checkboxProps={{
							checked: data.remember,
							onCheckedChange: (checked) => {
								setData("remember", Boolean(checked));
							},
						}}
						labelProps={{
							children: "Recuérdame",
						}}
					/>
				</div>

				<Button className="w-full" disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Iniciar Sesión</span>
				</Button>
			</form>
		</GuestLayout>
	);
}
