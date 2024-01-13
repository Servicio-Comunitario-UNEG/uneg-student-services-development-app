import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import type { FormEventHandler } from "react";

import type { Career, Headquarter } from "@/types";

import MultiSelectComboboxField from "@/Components/MultiSelectComboboxField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditCareerForm({
	initialValues,
	isUpdate = false,
	callToAction,
	headquarters,
}: {
	initialValues: Partial<Career>;
	isUpdate?: boolean;
	callToAction: string;
	headquarters: Pick<Headquarter, "id" | "name">[];
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the career.
		isUpdate
			? put(route("careers.update", initialValues.id))
			: post(route("careers.store"));
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
						selectedValues: options.filter((option) =>
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

			<div className="space-x-2">
				<Button disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>{callToAction}</span>
				</Button>

				<Button disabled={processing} variant="outline" asChild>
					<Link href={route("careers.index")}>Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
