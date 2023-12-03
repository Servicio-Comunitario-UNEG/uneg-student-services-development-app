import { Head } from "@inertiajs/react";

import { Benefit, PageProps, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditBenefitSemester from "./Partials/CreateOrEditBenefitSemesterForm";

export default function Create({
	benefits,
	semesters,
}: PageProps<{
	benefits: Benefit[];
	semesters: Semester[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Asignar Beneficio",
				description: "Asigna un beneficio a un semestre.",
			}}
		>
			<Head title="Asignar Beneficio" />

			<CreateOrEditBenefitSemester
				callToAction="Asignar"
				benefits={benefits}
				semesters={semesters}
				initialValues={{
					amount: 0,
				}}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
