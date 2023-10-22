import { useForm, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { Headquarter } from "@/types";

import ComboboxField from "@/Components/ComboboxField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

import { HeadquarterPageProps } from "../Index";

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
	const { representatives } = usePage<HeadquarterPageProps>().props;

	// Take the selectable representatives.
	const availableRepresentatives = representatives.filter(
		// Only take the availables and current representative of this headquarter.
		({ id, is_available }) => is_available || initialValues.user_id === id,
	);

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

				<ComboboxField
					id="representative"
					labelProps={{
						children: "Representante",
					}}
					comboboxProps={{
						placeholder: "Seleccione un representante",
						value: data.user_id ? String(data.user_id) : "",
						setValue: (id) => setData("user_id", Number(id)),
						options: availableRepresentatives.map(
							({ id, name, identity_card }) => ({
								label: `${name} (${identity_card.nationality}${identity_card.serial})`,
								value: String(id),
							}),
						),
					}}
					errorMessage={errors.user_id}
					isOptional
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
