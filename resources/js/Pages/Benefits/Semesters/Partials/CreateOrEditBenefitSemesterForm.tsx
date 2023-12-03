import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler } from "react";

import { Benefit, BenefitSemester, Semester } from "@/types";

import ComboboxField from "@/Components/ComboboxField";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";

export default function CreateOrEditBenefitSemester({
	initialValues,
	isUpdate = false,
	callToAction,
	benefits,
	semesters,
}: {
	initialValues: Partial<BenefitSemester>;
	isUpdate?: boolean;
	callToAction: string;
	benefits: Benefit[];
	semesters: Semester[];
}) {
	const { data, setData, errors, processing, post, put } =
		useForm(initialValues);

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the benefit semester.
		isUpdate
			? put(route("benefits-semesters.update", initialValues.id))
			: post(route("benefits-semesters.store"));
	};

	return (
		<form className="space-y-6" onSubmit={onSubmit}>
			<div className="space-y-4">
				<ComboboxField
					id="benefit"
					labelProps={{
						children: "Beneficio",
					}}
					comboboxProps={{
						buttonProps: {
							autoFocus: true,
						},
						placeholder: "Seleccione un beneficio",
						value: data.benefit_id ? String(data.benefit_id) : "",
						setValue: (id) => setData("benefit_id", Number(id)),
						options: benefits.map(({ id, name }) => ({
							label: name,
							value: String(id),
						})),
					}}
					errorMessage={errors.benefit_id}
				/>

				<ComboboxField
					id="semester"
					labelProps={{
						children: "Semestre",
					}}
					comboboxProps={{
						placeholder: "Seleccione un semestre",
						value: data.semester_id ? String(data.semester_id) : "",
						setValue: (id) => setData("semester_id", Number(id)),
						options: semesters.map(({ id, year, lapse }) => ({
							label: `${year}-${lapse}`,
							value: String(id),
						})),
					}}
					errorMessage={errors.semester_id}
				/>

				<TextField
					id="amount"
					labelProps={{
						children: "Cantidad",
					}}
					description="Total de beneficios de este tipo disponibles en el semestre"
					inputProps={{
						type: "number",
						placeholder: "ej: 100",
						required: true,
						value: data.amount ?? "",
						min: 1,
						onChange: (e) => {
							const parsed = parseInt(e.target.value);

							if (!e.target.value) {
								setData("amount", undefined);
								return;
							}

							setData(
								"amount",
								Number.isNaN(parsed) ? data.amount : parsed,
							);
						},
					}}
					errorMessage={errors.amount}
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
					<Link href={route("benefits-semesters.index")}>
						Cancelar
					</Link>
				</Button>
			</div>
		</form>
	);
}
