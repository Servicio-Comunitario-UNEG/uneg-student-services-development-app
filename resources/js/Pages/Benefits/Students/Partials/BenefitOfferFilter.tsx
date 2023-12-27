import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useMemo } from "react";

import Select from "@/Components/Select";

import { BenefitsStudentsPageProps } from "../Index";

export default function BenefitOfferFilter() {
	const { benefits, headquarters, semesters, filters } =
		usePage<BenefitsStudentsPageProps>().props;

	// Updates the search query.
	const onSemesterChange = useMemo(
		() =>
			debounce((semester: string) => {
				router.get(
					route("benefits-students.index"),
					{
						...filters,
						semester,
					},
					{
						preserveState: true,
						replace: true,
						only: ["benefits", "students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the headquarter query.
	const onHeadquarterChange = useMemo(
		() =>
			debounce((headquarter: string) => {
				router.get(
					route("benefits-students.index"),
					{
						...filters,
						headquarter,
					},
					{
						preserveState: true,
						replace: true,
						only: ["benefits", "students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the benefit query.
	const onBenefitChange = useMemo(
		() =>
			debounce((benefit: string) => {
				router.get(
					route("benefits-students.index"),
					{
						...filters,
						benefit,
					},
					{
						preserveState: true,
						replace: true,
						only: ["filters"],
					},
				);
			}, 500),
		[filters],
	);

	return (
		<div className="flex gap-2">
			<Select
				id="semester"
				className="max-w-xs"
				options={semesters.map(({ id, year, lapse }) => ({
					label: `${year}-${lapse}`,
					value: String(id),
				}))}
				selectProps={{
					onValueChange: onSemesterChange,
					defaultValue: filters.semester ?? undefined,
				}}
				placeholder="Semestre"
			/>

			<Select
				id="headquarter"
				className="max-w-xs"
				options={headquarters.map(({ id, name }) => ({
					label: name,
					value: String(id),
				}))}
				selectProps={{
					onValueChange: onHeadquarterChange,
					defaultValue: filters.headquarter ?? undefined,
				}}
				placeholder="Sede"
			/>

			<Select
				id="benefit"
				className="max-w-xs"
				options={benefits.map(
					({ id, benefit_semester: { benefit } }) => {
						return {
							label: benefit.name,
							value: String(id),
						};
					},
				)}
				selectProps={{
					onValueChange: onBenefitChange,
					defaultValue: filters.benefit ?? undefined,
					disabled: !filters.headquarter && !filters.benefit,
				}}
				placeholder="Beneficio"
			/>
		</div>
	);
}
