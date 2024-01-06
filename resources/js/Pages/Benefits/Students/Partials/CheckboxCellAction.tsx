import { usePage } from "@inertiajs/react";
import { CellContext } from "@tanstack/react-table";

import { Checkbox } from "@/Components/ui/checkbox";

import { useSelection } from "@/hooks/useSelection";

import { BenefitsStudentsPageProps, StudentWithBenefits } from "../Index";

export default function CheckboxCellAction({
	row,
}: CellContext<StudentWithBenefits, unknown>) {
	const {
		filters: { benefit, semester },
	} = usePage<BenefitsStudentsPageProps>().props;
	const selection = useSelection();
	const studentWithBenefits = row.original;

	// Wether it has any benefit assigned in the semester.
	const hasAnyBenefitAssigned = Boolean(
		semester &&
			studentWithBenefits.benefits.find(
				(item) =>
					String(item.benefit_semester.semester_id) === semester,
			),
	);

	// Wether the selected benefit is already given.
	const hasCurrentBenefitAssigned = Boolean(
		benefit &&
			studentWithBenefits.benefits.find(
				(item) => String(item.benefit_semester_id) === benefit,
			),
	);

	return (
		<Checkbox
			checked={
				selection.data.selected.includes(studentWithBenefits.id) ||
				(hasAnyBenefitAssigned &&
					!selection.data.unselected.includes(studentWithBenefits.id))
			}
			onCheckedChange={(checked) =>
				selection.toggle(studentWithBenefits.id, checked)
			}
			aria-label="Seleccionar fila"
			disabled={!hasCurrentBenefitAssigned && hasAnyBenefitAssigned}
		/>
	);
}
