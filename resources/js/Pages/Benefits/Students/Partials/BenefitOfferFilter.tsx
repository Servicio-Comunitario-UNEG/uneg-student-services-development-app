import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";

import Select from "@/Components/Select";

import { useSelection } from "@/hooks/useSelection";

import { BenefitsStudentsPageProps } from "../Index";

export default function BenefitOfferFilter() {
	const selection = useSelection();

	const { benefits, headquarters, semesters, filters } =
		usePage<BenefitsStudentsPageProps>().props;

	// Updates the search query.
	const onSemesterChange = useMemo(
		() =>
			debounce((semester: string) => {
				selection.clear();

				router.get(
					route("benefits-students.index"),
					{
						...filters,
						page: 1,
						benefit: "",
						semester,
					},
					{
						preserveState: true,
						replace: true,
						only: [
							"benefits",
							"students",
							"filters",
							"default_selected_students",
						],
					},
				);
			}, 500),
		[filters, selection],
	);

	// Updates the headquarter query.
	const onHeadquarterChange = useMemo(
		() =>
			debounce((headquarter: string) => {
				selection.clear();

				router.get(
					route("benefits-students.index"),
					{
						...filters,
						page: 1,
						benefit: "",
						headquarter,
					},
					{
						preserveState: true,
						replace: true,
						only: [
							"benefits",
							"students",
							"filters",
							"default_selected_students",
						],
					},
				);
			}, 500),
		[filters, selection],
	);

	// Updates the benefit query.
	const onBenefitChange = useMemo(
		() =>
			debounce((benefit: string) => {
				selection.clear(false);

				router.get(
					route("benefits-students.index"),
					{
						...filters,
						page: 1,
						benefit,
					},
					{
						preserveState: true,
						replace: true,
						only: ["filters", "students"],
					},
				);
			}, 500),
		[filters, selection],
	);

	useEffect(() => {
		return () => {
			onSemesterChange.cancel();
			onHeadquarterChange.cancel();
			onBenefitChange.cancel();
		};
	}, [onSemesterChange, onHeadquarterChange, onBenefitChange]);

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
