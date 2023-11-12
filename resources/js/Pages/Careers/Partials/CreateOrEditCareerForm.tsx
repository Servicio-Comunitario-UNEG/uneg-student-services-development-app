import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import type { FormEventHandler } from "react";

import type { Career } from "@/types";

import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditCareerForm({
	initialValues,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<Career>;
	isUpdate?: boolean;
	callToAction: string;
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

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<TextField
				id="career-name"
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
