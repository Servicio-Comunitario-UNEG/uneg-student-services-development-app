import { Head } from "@inertiajs/react";

import { Benefit, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditBenefitForm from "./Partials/CreateOrEditBenefitForm";

export default function Edit({ benefit }: PageProps<{ benefit: Benefit }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Beneficio",
			}}
		>
			<Head title="Editar Beneficio" />

			<CreateOrEditBenefitForm
				callToAction="Guardar cambios"
				initialValues={benefit}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
