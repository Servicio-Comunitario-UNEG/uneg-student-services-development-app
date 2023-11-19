import { Link, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { Brain, Loader2, Stethoscope } from "lucide-react";
import { FormEventHandler } from "react";

import { Student, Support } from "@/types";

import CardRadioGroupField from "@/Components/CardRadioGroupField";
import ComboboxField from "@/Components/ComboboxField";
import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditSupportForm({
	initialValues,
	isUpdate = false,
	callToAction,
	students,
}: {
	initialValues: Partial<Omit<Support, "created_at" | "updated_at">>;
	isUpdate?: boolean;
	callToAction: string;
	students: Pick<
		Student,
		"id" | "first_name" | "last_name" | "identity_card"
	>[];
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the support.
		isUpdate
			? put(route("supports.update", initialValues.id))
			: post(route("supports.store"));
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div className="space-y-4">
				<TextField
					id="date"
					description="Fecha cuando se realizó el apoyo."
					labelProps={{
						children: "Fecha",
					}}
					inputProps={{
						type: "date",
						max: dayjs().format("YYYY-MM-DD"),
						required: true,
						autoFocus: true,
						value: data.date,
						onChange: (e) => setData("date", e.target.value),
					}}
					errorMessage={errors.date}
				/>

				<CardRadioGroupField
					legendProps={{
						children: "Tipo",
					}}
					cardRadioGroupProps={{
						className: "grid-cols-2",
						name: "type",
						value: data.type ?? "",
						onValueChange: (value: Support["type"]) =>
							setData("type", value),
						options: [
							{
								label: "Médico",
								value: "medical",
								Icon: Stethoscope,
							},
							{
								label: "Psicológico",
								value: "psycological",
								Icon: Brain,
							},
						],
					}}
					errorMessage={errors.type}
				/>

				<ComboboxField
					id="student"
					description="El estudiante que recibe el apoyo."
					labelProps={{
						children: "Estudiante",
					}}
					comboboxProps={{
						placeholder: "Seleccione un estudiante",
						value: data.student_id ? String(data.student_id) : "",
						setValue: (id) => setData("student_id", Number(id)),
						options: students.map(
							({ id, first_name, last_name, identity_card }) => ({
								label: `${first_name} ${last_name} (${identity_card.nationality}${identity_card.serial})`,
								value: String(id),
							}),
						),
					}}
					errorMessage={errors.student_id}
				/>

				<TextareaField
					id="description"
					labelProps={{
						children: "Descripción",
					}}
					textareaProps={{
						placeholder: "Detalles del apoyo dado...",
						className: "h-16",
						required: true,
						value: data.description ?? "",
						onChange: (e) => setData("description", e.target.value),
						maxLength: 255,
					}}
					errorMessage={errors.description}
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
					<Link href={route("supports.index")}>Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
