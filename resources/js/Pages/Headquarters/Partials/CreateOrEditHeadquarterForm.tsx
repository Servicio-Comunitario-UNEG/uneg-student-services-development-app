import TextField from "@/Components/TextField";
import TextareaField from "@/Components/TextareaField";
import { Button } from "@/Components/ui/button";
import { Headquarter } from "@/types";
import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

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
			<div className="space-y-4">
				<TextField
					id="name"
					labelProps={{
						children: "Nombre",
					}}
					inputProps={{
						placeholder: "ej: Ciudad Universitaria",
						required: true,
						autoFocus: true,
						value: data.name,
						onChange: (e) => setData("name", e.target.value),
					}}
					errorMessage={errors.name}
				/>

				<TextareaField
					id="address"
					labelProps={{
						children: "Dirección",
					}}
					textareaProps={{
						placeholder: "ej: Avenida Atlántico",
						value: data.address ?? "",
						onChange: (e) => setData("address", e.target.value),
					}}
					errorMessage={errors.address}
					isOptional
				/>
			</div>

			<Button disabled={processing}>
				{processing ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : null}

				<span>{callToAction}</span>
			</Button>
		</form>
	);
}
