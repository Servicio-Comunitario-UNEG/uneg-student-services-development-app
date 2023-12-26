import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditBenefitForm from "./Partials/CreateOrEditBenefitForm";

export default function Create() {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Beneficio",
			}}
		>
			<Head title="Crear Beneficio" />

			<CreateOrEditBenefitForm
				callToAction="Crear"
				initialValues={{
					name: "",
				}}
			/>
		</PageLayout>
	);
}

Create.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
