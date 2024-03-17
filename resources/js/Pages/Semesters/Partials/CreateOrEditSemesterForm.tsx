import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { Semester } from "@/types";

import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditSemesterForm({
	initialValues,
	isUpdate = false,
	callToAction,
}: {
	initialValues: Partial<Pick<Semester, "id" | "year" | "lapse">>;
	isUpdate?: boolean;
	callToAction: string;
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the headquarter.
		isUpdate
			? put(route("semesters.update", initialValues.id))
			: post(route("semesters.store"));
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div className="space-y-4">
				<TextField
					id="year"
					labelProps={{
						children: "Año",
					}}
					inputProps={{
						autoComplete: "off",
						autoFocus: true,
						onChange: (e) => {
							const year = parseInt(e.target.value);

							setData(
								"year",
								Number.isNaN(year) ? undefined : year,
							);
						},
						type: "number",
						placeholder: "ej: 2020",
						required: true,
						value: data.year ?? "",
					}}
					errorMessage={errors.year}
				/>

				<TextField
					id="lapse"
					labelProps={{
						children: "Lapso",
					}}
					inputProps={{
						autoComplete: "off",
						onChange: (e) => {
							const lapse = parseInt(e.target.value);

							setData(
								"lapse",
								Number.isNaN(lapse) ? undefined : lapse,
							);
						},
						min: 1,
						max: 2,
						placeholder: "ej: 1",
						type: "number",
						required: true,
						value: data.lapse ?? "",
					}}
					errorMessage={errors.lapse}
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
					<Link href={route("semesters.index")}>Cancelar</Link>
				</Button>
			</div>
		</form>
	);
}
