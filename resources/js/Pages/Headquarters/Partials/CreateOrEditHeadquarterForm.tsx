import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { Headquarter } from "@/types";

import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditHeadquarterForm({
	initialValues,
	onSuccess,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<Headquarter>;
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

		// Update the headquarter.
		if (isUpdate) {
			put(route("headquarters.update", initialValues.id), {
				onSuccess,
			});

			return;
		}

		// Create the headquarter.
		post(route("headquarters.store"), {
			onSuccess,
		});
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<TextField
				id="headquarter-name"
				labelProps={{
					children: "Nombre",
				}}
				inputProps={{
					placeholder: "ej: Puerto Ordaz",
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
