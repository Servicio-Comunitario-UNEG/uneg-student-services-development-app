import { Head } from "@inertiajs/react";

import { Headquarter, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditCareerForm from "./Partials/CreateOrEditCareerForm";

export default function Create({
	headquarters,
}: PageProps<{ headquarters: Pick<Headquarter, "id" | "name">[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Carrera",
			}}
		>
			<Head title="Crear Carrera" />

			<CreateOrEditCareerForm
				callToAction="Crear"
				initialValues={{
					name: "",
				}}
				headquarters={headquarters}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
