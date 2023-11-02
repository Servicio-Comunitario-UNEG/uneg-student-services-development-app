import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { SocioeconomicInformation, Student } from "@/types";

import CardRadioGroupField from "@/Components/CardRadioGroupField";
import { CheckboxField } from "@/Components/CheckboxField";
import IdentityCardField from "@/Components/IdentityCardField";
import PhoneField from "@/Components/PhoneField";
import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";

export default function CreateOrEditStudentForm({
	initialValues,
	onSuccess,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<Omit<Student, "created_at" | "updated_at">> &
		Partial<SocioeconomicInformation>;
	onSuccess?: () => void;
	isUpdate?: boolean;
	callToAction: string;
}) {
	const { data, setData, errors, processing, post, put } = useForm({
		...initialValues,
		identity_card: initialValues.identity_card ?? {
			nationality: "V",
			serial: "",
		},
	});

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Update the student.
		if (isUpdate) {
			put(route("students.update", initialValues.id), {
				onSuccess,
				preserveScroll: true,
			});

			return;
		}

		// Create the student.
		post(route("students.store"), {
			onSuccess,
			preserveScroll: true,
		});
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<fieldset className="space-y-4">
				<div className="space-y-2">
					<legend className="font-heading font-medium text-foreground">
						Información Personal
					</legend>

					<Separator className="w-full" />
				</div>

				<div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
					<TextField
						id="first_name"
						labelProps={{
							children: "Nombre",
						}}
						inputProps={{
							autoComplete: "off",
							autoFocus: true,
							onChange: (e) =>
								setData("first_name", e.target.value),
							placeholder: "ej: John",
							required: true,
							value: data.first_name,
						}}
						errorMessage={errors.first_name}
					/>

					<TextField
						id="second_name"
						labelProps={{
							children: "Segundo nombre",
						}}
						inputProps={{
							autoComplete: "off",
							onChange: (e) =>
								setData("second_name", e.target.value),
							placeholder: "ej: Richard",
							value: data.second_name ?? "",
						}}
						errorMessage={errors.second_name}
						isOptional
					/>
				</div>

				<div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
					<TextField
						id="last_name"
						labelProps={{
							children: "Apellido",
						}}
						inputProps={{
							autoComplete: "off",
							required: true,
							onChange: (e) =>
								setData("last_name", e.target.value),
							placeholder: "ej: Doe",
							value: data.last_name,
						}}
						errorMessage={errors.last_name}
					/>

					<TextField
						id="second_last_name"
						labelProps={{
							children: "Segundo apellido",
						}}
						inputProps={{
							autoComplete: "off",
							onChange: (e) =>
								setData("second_last_name", e.target.value),
							placeholder: "ej: Roe",
							value: data.second_last_name ?? "",
						}}
						errorMessage={errors.second_last_name}
						isOptional
					/>
				</div>

				<IdentityCardField
					id="identity_card"
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
						children: "Cédula de Identidad",
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

				<TextField
					id="birth_date"
					labelProps={{
						children: "Fecha de nacimiento",
					}}
					inputProps={{
						type: "date",
						autoComplete: "off",
						onChange: (e) => setData("birth_date", e.target.value),
						required: true,
						value: data.birth_date ?? "",
					}}
					errorMessage={errors.birth_date}
				/>

				<CardRadioGroupField
					legendProps={{
						children: "Sexo",
					}}
					cardRadioGroupProps={{
						className: "grid-cols-2",
						name: "sex",
						value: data.sex ?? "",
						onValueChange: (value: Student["sex"]) =>
							setData("sex", value),
						options: [
							{
								label: "Masculino",
								value: "M",
							},
							{
								label: "Femenino",
								value: "F",
							},
						],
					}}
					errorMessage={errors.sex}
				/>
			</fieldset>

			<fieldset className="space-y-4">
				<div className="space-y-2">
					<legend className="font-heading font-medium text-foreground">
						Información de Contacto
					</legend>

					<Separator className="w-full" />
				</div>

				<PhoneField
					id="cell_phone"
					labelProps={{
						children: "Teléfono",
					}}
					phoneInputProps={{
						autoComplete: "tel",
						addInternationalOption: false,
						onChange: (e) => setData("cell_phone", e),
						placeholder: "0412-0000000",
						value: data.cell_phone,
						smartCaret: true,
						defaultCountry: "VE",
						countrySelectProps: {
							unicodeFlags: true,
						},
						limitMaxLength: true,
						required: true,
					}}
					errorMessage={errors.cell_phone}
				/>

				<PhoneField
					id="room_phone"
					labelProps={{
						children: "Teléfono alternativo",
					}}
					phoneInputProps={{
						autoComplete: "tel",
						addInternationalOption: false,
						onChange: (e) => setData("room_phone", e),
						placeholder: "0412-0000000",
						value: data.room_phone,
						smartCaret: true,
						defaultCountry: "VE",
						countrySelectProps: {
							unicodeFlags: true,
						},
						limitMaxLength: true,
					}}
					errorMessage={errors.room_phone}
					isOptional
				/>

				<TextareaField
					id="address"
					labelProps={{
						children: "Dirección",
					}}
					textareaProps={{
						autoComplete: "street-address",
						className: "h-16",
						placeholder: "ej: Los Olivos, Calle 5, Casa 1",
						value: data.address ?? "",
						onChange: (e) => setData("address", e.target.value),
						maxLength: 150,
					}}
					errorMessage={errors.address}
					isOptional
				/>
			</fieldset>

			<fieldset className="space-y-4">
				<div className="space-y-2">
					<legend className="font-heading font-medium text-foreground">
						Información socioeconómica
					</legend>

					<Separator className="w-full" />
				</div>

				<CheckboxField
					id="is_disabled"
					labelProps={{
						children: "¿Posee una discapacidad?",
					}}
					checkboxProps={{
						checked: data.is_disabled,
						onCheckedChange(checked) {
							setData("is_disabled", Boolean(checked));
						},
					}}
				/>

				<CheckboxField
					id="is_indigenous"
					labelProps={{
						children: "¿Es indigena?",
					}}
					checkboxProps={{
						checked: data.is_indigenous,
						onCheckedChange(checked) {
							setData("is_indigenous", Boolean(checked));
						},
					}}
				/>

				<TextField
					id="graffar"
					labelProps={{
						children: "Graffar",
					}}
					inputProps={{
						type: "number",
						min: 1,
						max: 5,
						placeholder: "ej: 1",
						value: data.graffar ?? "",
						onChange: (e) => {
							const graffar = Number(e.target.value);

							if (!Number.isNaN(graffar)) {
								setData("graffar", graffar);
							}
						},
					}}
					errorMessage={errors.graffar}
					isOptional
				/>

				<TextareaField
					id="description"
					labelProps={{
						children: "Situación",
					}}
					textareaProps={{
						className: "h-16",
						placeholder: "ej: Ambos padres trabajan.",
						value: data.situation ?? "",
						onChange: (e) => setData("situation", e.target.value),
						maxLength: 150,
					}}
					errorMessage={errors.situation}
					isOptional
				/>
			</fieldset>

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
