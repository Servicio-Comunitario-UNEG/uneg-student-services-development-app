import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { Student } from "@/types";

import CardRadioGroupField from "@/Components/CardRadioGroupField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditStudentForm({
	initialValues,
	onSuccess,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<Omit<Student, "created_at" | "updated_at">>;
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
			<div className="space-y-4">
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
							placeholder: "ej: Row",
							value: data.second_last_name ?? "",
						}}
						errorMessage={errors.second_last_name}
						isOptional
					/>
				</div>

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
