import CardRadioGroupField from "@/Components/CardRadioGroupField";
import PasswordField from "@/Components/PasswordField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import { Headquarter, User } from "@/types";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

export default function CreateOrEditUserForm({
	initialValues,
	onSuccess,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<
		User & {
			password: string;
		}
	>;
	onSuccess?: () => void;
	isUpdate?: boolean;
	callToAction: string;
	headquarters: Headquarter[];
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Update the headquarter.
		if (isUpdate) {
			put(route("users.update", initialValues.id), {
				onSuccess,
			});

			return;
		}

		// Create the headquarter.
		post(route("users.store"), {
			onSuccess,
		});
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div className="space-y-4">
				<TextField
					id="name"
					labelProps={{
						children: "Nombre",
					}}
					inputProps={{
						placeholder: "ej: John Doe",
						autoComplete: "name",
						required: true,
						autoFocus: true,
						value: data.name,
						onChange: (e) => setData("name", e.target.value),
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

				{isUpdate ? null : (
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
				)}

				<CardRadioGroupField
					legendProps={{
						children: "Rol",
					}}
					cardRadioGroupProps={{
						name: "role",
						value: data.role_name,
						onValueChange: (value) => {
							setData("role_name", value as User["role_name"]);
						},
						options: [
							{
								label: "Administrador",
								value: "admin",
							},
							{
								label: "Coordinador",
								value: "coordinator",
							},
							{
								label: "Representante",
								value: "representative",
							},
						],
					}}
					errorMessage={errors.role_name}
				/>
			</div>

			<div className="flex justify-end">
				<Button disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>{callToAction}</span>
				</Button>
			</div>
		</form>
	);
}
