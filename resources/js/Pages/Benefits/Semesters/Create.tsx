import { Head } from "@inertiajs/react";

import { Benefit, Headquarter, PageProps, Semester } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditBenefitSemesterForm from "./Partials/CreateOrEditBenefitSemesterForm";

export default function Create({
	benefits,
	semesters,
	headquarters,
}: PageProps<{
	benefits: Benefit[];
	semesters: Semester[];
	headquarters: Headquarter[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Asignar Beneficio",
				description: "Asigna un beneficio a un semestre.",
			}}
		>
			<Head title="Asignar Beneficio" />

			<CreateOrEditBenefitSemesterForm
				callToAction="Asignar"
				benefits={benefits}
				semesters={semesters}
				headquarters={headquarters}
				initialValues={{
					amount: 0,
				}}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
