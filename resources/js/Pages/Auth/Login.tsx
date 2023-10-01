import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/TextField";
import { CheckboxField } from "@/Components/CheckboxField";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";
import PasswordField from "@/Components/PasswordField";
import { useToast } from "@/Components/ui/use-toast";

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword: boolean;
}) {
	const { toast } = useToast();

	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	useEffect(() => {
		if (status) {
			toast({
				description: status,
			});
		}

		return () => {
			reset("password");
		};
	}, [toast, status]);

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
						canResetPassword={canResetPassword}
						inputProps={{
							value: data.password,
							autoComplete: "current-password",
							required: true,
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
