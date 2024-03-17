import { Link, useForm } from "@inertiajs/react";
import dayjs from "dayjs";
import { Brain, CircleDollarSign, Loader2, Stethoscope } from "lucide-react";
import { FormEventHandler } from "react";

import { Student, Service, User } from "@/types";

import CardRadioGroupField from "@/Components/CardRadioGroupField";
import ComboboxField from "@/Components/ComboboxField";
import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

export default function CreateOrEditServiceForm({
	initialValues,
	isUpdate = false,
	callToAction,
	students,
	professionals,
}: {
	initialValues: Partial<Omit<Service, "created_at" | "updated_at">>;
	isUpdate?: boolean;
	callToAction: string;
	students: Pick<
		Student,
		"id" | "first_name" | "last_name" | "identity_card"
	>[];
	professionals: Pick<User, "id" | "name" | "identity_card">[];
}) {
	const gate = useGate();

	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the support.
		isUpdate
			? put(route("services.update", initialValues.id))
			: post(route("services.store"));
	};

	// Options of service.
	const serviceTypes = [
		{
			label: "Médico",
			value: "medical",
			Icon: Stethoscope,
			permission: "assign medical support",
		},
		{
			label: "Psicosocial",
			value: "psychosocial",
			Icon: Brain,
			permission: "assign psychosocial support",
		},
		{
			label: "Económico",
			value: "economical",
			Icon: CircleDollarSign,
			permission: "assign economical support",
		},
	].filter(({ permission }) => gate.allows(permission));

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div className="space-y-4">
				<TextField
					id="date"
					description="Fecha cuando se realizó el servicio."
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
						className: "grid-cols-3",
						name: "type",
						value: data.type ?? "",
						onValueChange: (value: Service["type"]) =>
							setData("type", value),
						options: serviceTypes,
					}}
					errorMessage={errors.type}
				/>

				{data.type !== "economical" ? (
					<ComboboxField
						id="professional"
						description="Profesional que realizó el servicio."
						labelProps={{
							children: "Profesional",
						}}
						comboboxProps={{
							placeholder: "Seleccione un profesional",
							value: data.professional_id
								? String(data.professional_id)
								: "",
							setValue: (id) =>
								setData("professional_id", Number(id)),
							options: professionals.map(
								({ id, name, identity_card }) => ({
									label: `${name} (${identity_card.nationality}${identity_card.serial})`,
									value: String(id),
								}),
							),
						}}
						errorMessage={errors.professional_id}
					/>
				) : null}

				<ComboboxField
					id="student"
					description="El estudiante que recibe el servicio."
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
						placeholder: "Detalles del servicio dado...",
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
					<Link href={route("services.index")}>Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
