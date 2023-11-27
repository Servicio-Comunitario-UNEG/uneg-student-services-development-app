import { router, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { DateRange } from "react-day-picker";

import { DatePickerWithRange } from "@/Components/DateRangePicker";

import { SupportsPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters } = usePage<SupportsPageProps>().props;

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

	useEffect(() => {
		return () => {
			onSelectRangeChange.cancel();
		};
	}, [onSelectRangeChange]);

	return (
		<DatePickerWithRange
			initialValues={from ? { from, to } : undefined}
			onRangeSelect={onSelectRangeChange}
		/>
	);
}
