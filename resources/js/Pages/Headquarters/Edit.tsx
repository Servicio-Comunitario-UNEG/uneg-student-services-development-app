import { Head } from "@inertiajs/react";

import { City, Headquarter, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditHeadquarterForm, {
	Representative,
} from "./Partials/CreateOrEditHeadquarterForm";

export default function Edit({
	representatives,
	headquarter,
	cities,
}: PageProps<{
	headquarter: Headquarter;
	representatives: Representative[];
	cities: City[];
}>) {
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
				cities={cities}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
