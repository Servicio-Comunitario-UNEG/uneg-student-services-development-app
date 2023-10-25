import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import type { FormEventHandler } from "react";

import type { Career } from "@/types";

import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

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
