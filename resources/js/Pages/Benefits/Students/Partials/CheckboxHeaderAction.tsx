import { usePage } from "@inertiajs/react";
import { HeaderContext } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";

import { useSelection } from "@/hooks/useSelection";

import { BenefitsStudentsPageProps, StudentWithBenefits } from "../Index";

export default function CheckboxHeaderAction({
	table,
}: HeaderContext<StudentWithBenefits, unknown>) {
	const selection = useSelection();
	const { current_benefit } = usePage<BenefitsStudentsPageProps>().props;

	const ids = table.getCoreRowModel().rows.map((row) => row.original.id);

	// Wether some row is selected.
	const hasSomeRowsSelected = ids.some(
		(id) =>
			(selection.data.defaultSelected.includes(id) &&
				!selection.data.unselected.includes(id)) ||
			selection.data.selected.includes(id),
	);

	// Wether all rows are selected.
	const hasAllRowsSelected = ids.every(
		(id) =>
			selection.data.selected.includes(id) ||
			(selection.data.defaultSelected.includes(id) &&
				!selection.data.unselected.includes(id)),
	);

	// Current amount of benefits available.
	const availableBenefits = current_benefit
		? current_benefit.available -
			selection.data.selected.length +
			selection.data.unselected.length
		: 0;

	return (
		<Checkbox
			checked={
				hasAllRowsSelected || (hasSomeRowsSelected && "indeterminate")
			}
			onCheckedChange={(checked) => selection.toggleAll(ids, checked)}
			aria-label="Seleccionar todas las filas"
			className="translate-y-[2px]"
			disabled={!availableBenefits && !hasAllRowsSelected}
		/>
	);
}
