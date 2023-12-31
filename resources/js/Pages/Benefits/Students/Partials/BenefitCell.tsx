import { usePage } from "@inertiajs/react";
import { CellContext } from "@tanstack/react-table";

import { BenefitsStudentsPageProps, StudentWithBenefits } from "../Index";

export default function BenefitCell({
	row,
}: CellContext<StudentWithBenefits, unknown>) {
	const {
		filters: { semester },
	} = usePage<BenefitsStudentsPageProps>().props;

	if (!semester) return null;

	const benefits = row.getValue(
		"benefits",
	) as StudentWithBenefits["benefits"];

	if (benefits.length === 0) return null;

	// Get the benefit given in the current semester.
	const currentBenefit = benefits.find(
		(item) => String(item.benefit_semester.semester_id) === semester,
	);

	return currentBenefit ? currentBenefit.benefit_semester.benefit.name : null;
}
