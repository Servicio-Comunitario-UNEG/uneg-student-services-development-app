import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { Headquarter, User } from "@/types";

import ComboboxField from "@/Components/ComboboxField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export type Representative = Pick<User, "id" | "name" | "identity_card">;

export default function CreateOrEditHeadquarterForm({
	initialValues,
	isUpdate = false,
	callToAction,
	representatives,
}: {
	initialValues: Partial<Pick<Headquarter, "id" | "name" | "user_id">>;
	isUpdate?: boolean;
	callToAction: string;
	representatives: Representative[];
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the headquarter.
		isUpdate
			? put(route("headquarters.update", initialValues.id))
			: post(route("headquarters.store"));
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
						options: representatives.map(
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

			<div className="space-x-2">
				<Button disabled={processing}>
					{processing ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : null}

					<span>{callToAction}</span>
				</Button>

				<Button disabled={processing} variant="outline" asChild>
					<Link href={route("headquarters.index")}>Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
