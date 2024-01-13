import { Head } from "@inertiajs/react";

import { PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditHeadquarterForm, {
	Representative,
} from "./Partials/CreateOrEditHeadquarterForm";

export default function Create({
	representatives,
}: PageProps<{ representatives: Representative[] }>) {
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
			/>
		</PageLayout>
	);
}

Create.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
