import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import type { FormEventHandler } from "react";

import type { Career } from "@/types";

import MultiSelectComboboxField from "@/Components/MultiSelectComboboxField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

import { CareerPageProps } from "../Index";

export default function CreateOrEditCareerForm({
	initialValues,
	onSuccess,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<Career>;
	onSuccess?: () => void;
	isUpdate?: boolean;
	callToAction: string;
}) {
	const { headquarters } = usePage<CareerPageProps>().props;

	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Update the career.
		if (isUpdate) {
			put(route("careers.update", initialValues.id), {
				onSuccess,
				preserveScroll: true,
			});

			return;
		}

		// Create the career.
		post(route("careers.store"), {
			onSuccess,
			preserveScroll: true,
		});
	};

	// Build the headquarters options.
	const options = headquarters.map(({ id, name }) => ({
		label: name,
		value: String(id),
	}));

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div className="space-y-4">
				<TextField
					id="career_name"
					labelProps={{
						children: "Nombre",
					}}
					inputProps={{
						placeholder: "ej: Ingeniería en Informática",
						required: true,
						autoFocus: true,
						value: data.name,
						onChange: (e) => setData("name", e.target.value),
					}}
					errorMessage={errors.name}
				/>

				<MultiSelectComboboxField
					id="headquarters"
					labelProps={{
						children: "Sedes",
					}}
					description="Las sedes donde impartirán la carrera."
					multiSelectComboboxProps={{
						selectedValues: options.filter(
							(option) =>
								data.headquarters_id?.includes(
									Number(option.value),
								),
						),
						setSelectedValues: (options) =>
							setData(
								"headquarters_id",
								options.map((option) => Number(option.value)),
							),
						options,
						placeholder: "Seleccione las sedes",
					}}
					errorMessage={errors.headquarters_id}
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
