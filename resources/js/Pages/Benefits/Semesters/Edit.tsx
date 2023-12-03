import { Head } from "@inertiajs/react";

import { Benefit, BenefitSemester, PageProps, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditBenefitSemesterForm from "./Partials/CreateOrEditBenefitSemesterForm";

export default function Edit({
	benefit_semester,
	benefits,
	semesters,
}: PageProps<{
	benefit_semester: BenefitSemester;
	benefits: Benefit[];
	semesters: Semester[];
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
				initialValues={benefit_semester}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
