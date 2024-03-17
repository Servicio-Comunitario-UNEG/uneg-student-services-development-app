import { Head } from "@inertiajs/react";

import { City, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditHeadquarterForm, {
	Representative,
} from "./Partials/CreateOrEditHeadquarterForm";

export default function Create({
	representatives,
	cities,
}: PageProps<{ representatives: Representative[]; cities: City[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Sede",
			}}
		>
			<Head title="Crear Sede" />

			<CreateOrEditHeadquarterForm
				callToAction="Crear"
				initialValues={{
					name: "",
					user_id: null,
				}}
				representatives={representatives}
				cities={cities}
			/>
		</PageLayout>
	);
}

Create.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
