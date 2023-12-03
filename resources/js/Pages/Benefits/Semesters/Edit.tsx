import { Head } from "@inertiajs/react";

import { Benefit, Headquarter, PageProps, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditBenefitSemesterForm, {
	BenefitSemesterWithHeadquarters,
} from "./Partials/CreateOrEditBenefitSemesterForm";

export default function Edit({
	benefit_semester,
	benefits,
	semesters,
	headquarters,
}: PageProps<{
	benefit_semester: BenefitSemesterWithHeadquarters;
	benefits: Benefit[];
	semesters: Semester[];
	headquarters: Headquarter[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Asignación de Beneficio",
			}}
		>
			<Head title="Editar Asignación Beneficio" />

			<CreateOrEditBenefitSemesterForm
				callToAction="Guardar cambios"
				benefits={benefits}
				semesters={semesters}
				headquarters={headquarters}
				initialValues={benefit_semester}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
