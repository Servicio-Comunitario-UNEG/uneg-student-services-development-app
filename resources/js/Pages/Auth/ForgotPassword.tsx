import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler, useEffect } from "react";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import { useToast } from "@/Components/ui/use-toast";

export default function ForgotPassword({ status }: { status?: string }) {
	const { toast } = useToast();

	const { data, setData, post, errors } = useForm({
		email: "",
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("password.email"));
	};

	useEffect(() => {
		if (status) {
			toast({
				description: status,
			});
		}
	}, [status, toast]);

	return (
		<GuestLayout
			title="¿Olvidaste tu Contraseña?"
			subtitle="Te enviaremos las instrucciones para que lo reestablezcas"
		>
			<Head title="Olvidé mi Contraseña" />

			<form className="space-y-6" onSubmit={submit}>
				<TextField
					id="email"
					labelProps={{
						children: "Correo electrónico",
					}}
					inputProps={{
						type: "email",
						placeholder: "ej: johndoe@gmail.com",
						value: data.email,
						autoFocus: true,
						required: true,
						onChange: (e) => setData("email", e.target.value),
					}}
					errorMessage={errors.email}
				/>

				<Button className="w-full">Reestablecer contraseña</Button>
			</form>
		</GuestLayout>
	);
}
