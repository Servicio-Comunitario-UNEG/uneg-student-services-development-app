import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import type { FormEventHandler } from "react";

import type { Role, User } from "@/types";

import IdentityCardField from "@/Components/IdentityCardField";
import PasswordField from "@/Components/PasswordField";
import RadioGroupField from "@/Components/RadioGroupField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditUserForm({
	initialValues,
	isUpdate = false,
	callToAction,
	roles,
}: {
	initialValues: Partial<
		Pick<User, "email" | "name" | "identity_card" | "id"> & {
			password: string;
			role_name: string;
		}
	>;
	onSuccess?: () => void;
	isUpdate?: boolean;
	callToAction: string;
	roles: Role[];
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the user.
		isUpdate
			? put(route("users.update", initialValues.id))
			: post(route("users.store"));
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
						autoComplete: "off",
						autoFocus: true,
						onChange: (e) => setData("name", e.target.value),
						placeholder: "ej: John Doe",
						required: true,
						value: data.name,
					}}
					errorMessage={errors.name}
				/>

				<TextField
					id="email"
					labelProps={{
						children: "Correo electrónico",
					}}
					inputProps={{
						autoComplete: "off",
						onChange: (e) => setData("email", e.target.value),
						placeholder: "ej: johndoe@gmail.com",
						required: true,
						type: "email",
						value: data.email,
					}}
					errorMessage={errors.email}
				/>

				<IdentityCardField
					id="identity-card"
					selectProps={{
						value: data.identity_card?.nationality,
						name: "nationality",
						onValueChange(value) {
							setData("identity_card", {
								nationality: value,
								serial: data.identity_card?.serial ?? "",
							});
						},
					}}
					labelProps={{
						children: "Cédula de identidad",
					}}
					inputProps={{
						name: "serial",
						onChange: (e) =>
							setData("identity_card", {
								nationality:
									data.identity_card?.nationality ?? "V",
								serial: e.target.value,
							}),
						placeholder: "ej: 10000000",
						required: true,
						value: data.identity_card?.serial,
						autoComplete: "off",
					}}
					errorMessage={errors.identity_card}
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

				<RadioGroupField
					legendProps={{
						children: "Rol",
					}}
					radioGroupProps={{
						name: "role",
						value: data.role_name ?? "",
						onValueChange: (value) => setData("role_name", value),
						options: roles.map((role) => ({
							label: role.description,
							value: role.name,
						})),
					}}
					errorMessage={errors.role_name}
				/>
			</div>

			<div className="space-x-2">
				<Button disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>{callToAction}</span>
				</Button>

				<Button disabled={processing} variant="outline" asChild>
					<Link href={route("users.index")}>Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
