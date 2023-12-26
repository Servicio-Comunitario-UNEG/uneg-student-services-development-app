import { Head } from "@inertiajs/react";

import { Headquarter, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditHeadquarterForm, {
	Representative,
} from "./Partials/CreateOrEditHeadquarterForm";

export default function Edit({
	representatives,
	headquarter,
}: PageProps<{ headquarter: Headquarter; representatives: Representative[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Sede",
			}}
		>
			<Head title="Editar Sede" />

			<CreateOrEditHeadquarterForm
				callToAction="Guardar cambios"
				initialValues={headquarter}
				representatives={representatives}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
