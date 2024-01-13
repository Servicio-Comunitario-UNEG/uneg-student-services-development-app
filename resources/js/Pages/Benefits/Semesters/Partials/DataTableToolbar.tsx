import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { Input } from "@/Components/ui/input";

import { BenefitSemesterPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters, benefits, semesters } =
		usePage<BenefitSemesterPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("benefits-semesters.index"),
					{
						...filters,
						page: 1,
						search: e.target.value,
					},
					{
						preserveState: true,
						replace: true,
						only: ["benefits_semesters", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the benefits query.
	const onBenefitChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("benefits-semesters.index"),
					{
						...filters,
						page: 1,
						benefits: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["benefits_semesters", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the semester query.
	const onSemesterChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("benefits-semesters.index"),
					{
						...filters,
						page: 1,
						semesters: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["benefits_semesters", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	useEffect(() => {
		return () => {
			onSearchTermChange.cancel();
			onBenefitChange.cancel();
			onSemesterChange.cancel();
		};
	}, [onSearchTermChange, onBenefitChange, onSemesterChange]);

	return (
		<div className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
			<Input
				id="benefit-search"
				defaultValue={filters.search}
				type="search"
				placeholder="Buscar por nombre"
				onChange={onSearchTermChange}
				className="h-8 w-full sm:max-w-xs"
			/>

			<div className="grid w-full grid-cols-2 gap-2 sm:flex">
				<DataTableFacetedFilter
					defaultValues={filters.benefits}
					className="max-w-xs"
					options={benefits.map(({ id, name }) => ({
						label: name,
						value: String(id),
					}))}
					onChange={onBenefitChange}
					title="Beneficio"
				/>

				<DataTableFacetedFilter
					className="max-w-xs"
					options={semesters.map(({ id, year, lapse }) => ({
						label: `${year}-${lapse}`,
						value: String(id),
					}))}
					defaultValues={filters.semesters}
					onChange={onSemesterChange}
					title="Semestre"
				/>
			</div>
		</div>
	);
}
