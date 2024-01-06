import { usePage } from "@inertiajs/react";
import { CellContext } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";

import { useSelection } from "@/hooks/useSelection";

import { BenefitsStudentsPageProps, StudentWithBenefits } from "../Index";

export default function CheckboxCellAction({
	row,
}: CellContext<StudentWithBenefits, unknown>) {
	const {
		current_benefit,
		filters: { semester },
	} = usePage<BenefitsStudentsPageProps>().props;
	const selection = useSelection();
	const studentWithBenefits = row.original;

	// Wether it has any benefit assigned in the semester.
	const hasAnotherBenefitAssigned = Boolean(
		semester &&
			studentWithBenefits.benefits.find((benefit) => {
				const isFromSelectedSemester =
					String(benefit.benefit_semester.semester_id) === semester;

				return current_benefit
					? isFromSelectedSemester &&
							benefit.id !== current_benefit.benefit.id
					: isFromSelectedSemester;
			}),
	);

	// Wether the selected benefit is already given.
	const hasCurrentBenefitAssigned = Boolean(
		current_benefit &&
			studentWithBenefits.benefits.find(
				(benefit) => benefit.id === current_benefit.benefit.id,
			),
	);

	// Wether the current student is selected.
	const isChecked =
		hasAnotherBenefitAssigned ||
		(hasCurrentBenefitAssigned &&
			!selection.data.unselected.includes(studentWithBenefits.id)) ||
		selection.data.selected.includes(studentWithBenefits.id);

	// Current amount of benefits available.
	const availableBenefits = current_benefit
		? current_benefit.available -
			selection.data.selected.length +
			selection.data.unselected.length
		: 0;

	return (
		<Checkbox
			checked={isChecked}
			onCheckedChange={(checked) =>
				selection.toggle(studentWithBenefits.id, checked)
			}
			aria-label="Seleccionar fila"
			disabled={
				hasAnotherBenefitAssigned
					? true
					: !isChecked && availableBenefits <= 0
			}
		/>
	);
}
