import { router, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { DateRange } from "react-day-picker";

import { Support } from "@/types";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { DatePickerWithRange } from "@/Components/DateRangePicker";

import { SupportsPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters } = usePage<SupportsPageProps>().props;

	// The types.
	const types: {
		label: string;
		value: Support["type"];
	}[] = [
		{
			label: "Médico",
			value: "medical",
		},
		{
			label: "Psicológico",
			value: "psychological",
		},
	];

	// Parse the range.
	const from = filters.range.from
		? dayjs(filters.range.from).toDate()
		: undefined;

	const to = filters.range.to ? dayjs(filters.range.to).toDate() : undefined;

	// Updates the range query.
	const onSelectRangeChange = useMemo(
		() =>
			debounce((range?: DateRange) => {
				router.get(
					route("supports.index"),
					{
						...filters,
						page: 1,
						range: {
							from: range?.from
								? dayjs(range.from).format("YYYY-MM-DD")
								: "",
							to: range?.to
								? dayjs(range.to).format("YYYY-MM-DD")
								: "",
						},
					},
					{
						preserveState: true,
						replace: true,
						only: ["supports", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the types query,
	const onSelectTypeChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("supports.index"),
					{
						...filters,
						page: 1,
						types: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["supports", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	useEffect(() => {
		return () => {
			onSelectRangeChange.cancel();
			onSelectTypeChange.cancel();
		};
	}, [onSelectRangeChange, onSelectTypeChange]);

	return (
		<div className="flex flex-1 items-center space-x-2">
			<DatePickerWithRange
				initialValues={from ? { from, to } : undefined}
				onRangeSelect={onSelectRangeChange}
				buttonClassName="h-8"
			/>

			<DataTableFacetedFilter
				defaultValues={filters.types}
				onChange={onSelectTypeChange}
				title="Tipos"
				options={types}
			/>
		</div>
	);
}
