import { Link, useForm } from "@inertiajs/react";
import { Loader2, Plus, Trash } from "lucide-react";
import { FormEventHandler } from "react";

import {
	Benefit,
	BenefitSemester,
	BenefitSemesterHeadquarter,
	Headquarter,
	Semester,
} from "@/types";

import Combobox from "@/Components/Combobox";
import ComboboxField from "@/Components/ComboboxField";
import InputError from "@/Components/InputError";
import TextField from "@/Components/TextField";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";

export type BenefitSemesterWithHeadquarters = BenefitSemester & {
	benefit_semester_headquarters: Partial<
		Pick<BenefitSemesterHeadquarter, "headquarter_id" | "amount">
	>[];
};

export default function CreateOrEditBenefitSemesterForm({
	initialValues,
	isUpdate = false,
	callToAction,
	benefits,
	semesters,
	headquarters,
}: {
	initialValues: Partial<
		BenefitSemesterWithHeadquarters & {
			total_headquarters_amount: number | null;
		}
	>;
	isUpdate?: boolean;
	callToAction: string;
	benefits: Benefit[];
	semesters: Semester[];
	headquarters: Headquarter[];
}) {
	const { data, setData, errors, processing, post, put } = useForm({
		...initialValues,
		benefit_semester_headquarters:
			initialValues.benefit_semester_headquarters ?? [],
	});

	const onSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		// The id must be provided on update.
		if (isUpdate && !initialValues.id) return;

		// Create or update the benefit semester.
		isUpdate
			? put(route("benefits-semesters.update", initialValues.id))
			: post(route("benefits-semesters.store"));
	};

	/// Creates an empty headquarter.
	const addHeadquarter = () => {
		const lastHeadquarter = data.benefit_semester_headquarters.length
			? data.benefit_semester_headquarters[
					data.benefit_semester_headquarters.length - 1
				]
			: undefined;

		if (
			lastHeadquarter &&
			(!lastHeadquarter.headquarter_id || !lastHeadquarter.amount)
		) {
			return;
		}

		setData(
			"benefit_semester_headquarters",
			data.benefit_semester_headquarters.concat({
				headquarter_id: undefined,
				amount: 0,
			}),
		);
	};

	/// Deletes the headquarter.
	const deleteHeadquarter = (index: number) => {
		setData(
			"benefit_semester_headquarters",
			data.benefit_semester_headquarters.filter(
				(_, itemIndex) => index !== itemIndex,
			),
		);
	};

	/// The amount of benefits availabel.
	const availableBenefits = () => {
		const { amount = 0, benefit_semester_headquarters = [] } = data;

		const headquartersAmount = benefit_semester_headquarters.reduce(
			(previous, { amount = 0 }) => {
				if (amount < 0) return previous;

				return previous + amount;
			},
			0,
		);

		const available = amount - headquartersAmount;
		return available <= 0 ? 0 : available;
	};

	const available = availableBenefits();

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

				<fieldset className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center space-x-2">
							<legend className="text-sm font-medium text-foreground">
								Sedes
							</legend>

							<Button
								variant="ghost"
								size="icon"
								type="button"
								onClick={() => addHeadquarter()}
							>
								<Plus className="h-4 w-4" />

								<span className="sr-only">Agregar sede</span>
							</Button>

							<span className="font-mono text-sm">
								({available}{" "}
								{available === 1 ? "Disponible" : "Disponibles"}
								)
							</span>
						</div>

						<Separator className="w-full" />
					</div>

					<div className="space-y-2">
						{data.benefit_semester_headquarters.map(
							({ headquarter_id, amount }, index) => {
								const idKey = `benefit_semester_headquarters.${index}.headquarter_id`;
								const amountKey = `benefit_semester_headquarters.${index}.amount`;

								// @ts-expect-error: The errors object has a defined type which doesn't contemplate field arrays.
								// prettier-ignore
								const idError = idKey in errors && errors[idKey] && typeof errors[idKey] === "string" ? errors[idKey] : "";

								// @ts-expect-error: The errors object has a defined type which doesn't contemplate field arrays.
								// prettier-ignore
								const amountError = amountKey in errors && errors[amountKey] && typeof errors[amountKey] === "string" ? errors[amountKey] : "";

								// The current selected headquarters.
								const currentHeadquarters = [
									...data.benefit_semester_headquarters,
								];

								// This field selected headquarter.
								const currentHeadquarter =
									currentHeadquarters[index].headquarter_id;

								return (
									<div key={index}>
										<div className="flex gap-2">
											<Button
												className="text-destructive"
												variant="ghost"
												size="icon"
												type="button"
												onClick={() =>
													deleteHeadquarter(index)
												}
											>
												<Trash className="h-4 w-4" />

												<span className="sr-only">
													Eliminar sede {index}
												</span>
											</Button>

											<div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-2">
												<div className="space-y-2">
													<Combobox
														placeholder="Seleccione una sede"
														value={
															headquarter_id
																? String(
																		headquarter_id,
																	)
																: ""
														}
														setValue={(id) => {
															currentHeadquarters[
																index
															].headquarter_id =
																Number(id);

															setData(
																"benefit_semester_headquarters",
																currentHeadquarters,
															);
														}}
														options={headquarters
															.filter(
																(
																	headquarter,
																) => {
																	// Display this field headquarter and the unselected headquarters.
																	return (
																		currentHeadquarter ===
																			headquarter.id ||
																		!data.benefit_semester_headquarters.some(
																			(
																				item,
																			) =>
																				item.headquarter_id ===
																				headquarter.id,
																		)
																	);
																},
															)
															.map(
																({
																	id,
																	name,
																}) => ({
																	label: name,
																	value: String(
																		id,
																	),
																}),
															)}
													/>

													<InputError
														message={idError}
													/>
												</div>

												<div className="space-y-2">
													<Input
														id={`headquarter-${index}-amount`}
														name={`headquarter-${index}-amount`}
														placeholder="ej: 10"
														value={amount ?? ""}
														type="number"
														onChange={(e) => {
															const parsed =
																parseInt(
																	e.target
																		.value,
																);

															if (
																!e.target.value
															) {
																currentHeadquarters[
																	index
																].amount =
																	undefined;
																setData(
																	"benefit_semester_headquarters",
																	currentHeadquarters,
																);
																return;
															}

															currentHeadquarters[
																index
															].amount =
																Number.isNaN(
																	parsed,
																)
																	? currentHeadquarters[
																			index
																		].amount
																	: parsed;

															setData(
																"benefit_semester_headquarters",
																currentHeadquarters,
															);
														}}
													/>

													<InputError
														message={amountError}
													/>
												</div>
											</div>
										</div>
									</div>
								);
							},
						)}
					</div>

					<InputError message={errors.total_headquarters_amount} />
				</fieldset>
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
