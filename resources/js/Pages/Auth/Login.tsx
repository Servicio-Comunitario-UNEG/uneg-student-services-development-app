import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextField from "@/Components/TextField";
import { CheckboxField } from "@/Components/CheckboxField";
import { Button } from "@/Components/ui/button";
import { Loader2 } from "lucide-react";

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
			<Head title="Log in" />

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

					<TextField
						id="password"
						labelProps={{
							children: "Contraseña",
						}}
						inputProps={{
							type: "password",
							value: data.password,
							autoComplete: "current-password",
							onChange: (e) => {
								setData("password", e.target.value);
							},
						}}
						errorMessage={errors.password}
					/>

					<div className="flex justify-between">
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

						{canResetPassword ? (
							<div className="hidden sm:block">
								<Button asChild variant="link">
									<Link href={route("password.request")}>
										Recuperar contraseña
									</Link>
								</Button>
							</div>
						) : null}
					</div>
				</div>

				<Button className="w-full" disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>Iniciar Sesión</span>
				</Button>

				{canResetPassword ? (
					<div className="sm:hidden">
						<div className="flex justify-center">
							<Button asChild variant="link">
								<Link href={route("password.request")}>
									Recuperar contraseña
								</Link>
							</Button>
						</div>
					</div>
				) : null}
			</form>
		</GuestLayout>
	);
}
