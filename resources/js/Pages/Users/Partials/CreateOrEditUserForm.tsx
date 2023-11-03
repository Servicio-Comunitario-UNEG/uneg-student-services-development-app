import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import type { FormEventHandler } from "react";

import type { User } from "@/types";

import CardRadioGroupField from "@/Components/CardRadioGroupField";
import IdentityCardField from "@/Components/IdentityCardField";
import PasswordField from "@/Components/PasswordField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

import { UserPageProps } from "../Index";

export default function CreateOrEditUserForm({
	initialValues,
	onSuccess,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<
		User & {
			password: string;
			role_name: string;
		}
	>;
	onSuccess?: () => void;
	isUpdate?: boolean;
	callToAction: string;
}) {
	// Get the roles the user can select.
	const { assignableRoles } = usePage<UserPageProps>().props;

	const { data, setData, errors, processing, post, put } = useForm({
		...initialValues,
		identity_card: initialValues.identity_card ?? {
			nationality: "V",
			serial: "",
		},
		role_name: initialValues.current_role?.name || initialValues.role_name,
	});

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Update the user.
		if (isUpdate) {
			put(route("users.update", initialValues.id), {
				onSuccess,
				preserveScroll: true,
			});

			return;
		}

		// Create the user.
		post(route("users.store"), {
			onSuccess,
			preserveScroll: true,
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

				<CardRadioGroupField
					legendProps={{
						children: "Rol",
					}}
					cardRadioGroupProps={{
						style: {
							gridTemplateColumns: `repeat(${assignableRoles.length}, minmax(0, 1fr))`,
						},
						name: "role",
						value: data.role_name ?? "",
						onValueChange: (value) => setData("role_name", value),
						options: assignableRoles.map((role) => ({
							label: role.description,
							value: role.name,
						})),
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
