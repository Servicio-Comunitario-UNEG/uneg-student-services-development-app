import { Head } from "@inertiajs/react";

import {
	Benefit,
	BenefitSemester,
	BenefitSemesterHeadquarter,
	Headquarter,
	Semester,
} from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import BenefitOfferFilter from "./Partials/BenefitOfferFilter";

export type BenefitsStudentsPageProps = {
	semesters: Semester[];
	headquarters: Headquarter[];
	benefits: Array<
		BenefitSemesterHeadquarter & {
			benefit_semester: BenefitSemester & { benefit: Benefit };
		}
	>;
	filters: {
		semester: string | null;
		headquarter: string | null;
		benefit: string | null;
	};
};

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Beneficios por Estudiante",
				description:
					"Administra los beneficios asignados a cada estudiante.",
			}}
		>
			<Head title="Beneficios por Estudiante" />

			<BenefitOfferFilter />
		</PageLayout>
	);
}

Index.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
