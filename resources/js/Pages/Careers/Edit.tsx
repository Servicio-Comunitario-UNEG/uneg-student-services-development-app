import { Head } from "@inertiajs/react";

import { Career, Headquarter, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditCareerForm from "./Partials/CreateOrEditCareerForm";

export default function Edit({
	career,
	headquarters,
}: PageProps<{
	career: Career;
	headquarters: Pick<Headquarter, "id" | "name">[];
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Carrera",
			}}
		>
			<Head title="Editar Carrera" />

			<CreateOrEditCareerForm
				callToAction="Guardar cambios"
				initialValues={career}
				headquarters={headquarters}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
