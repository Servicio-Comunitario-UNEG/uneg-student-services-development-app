import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditStudentForm from "./Partials/CreateOrEditStudentForm";

export default function Create() {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Estudiante",
			}}
		>
			<Head title="Crear Estudiante" />

			<CreateOrEditStudentForm
				callToAction="Crear"
				initialValues={{
					address: "",
					birth_date: "",
					cell_phone: "",
					email: "",
					first_name: "",
					identity_card: {
						nationality: "V",
						serial: "",
					},
					last_name: "",
					second_last_name: "",
					second_name: "",
					sex: "M",
					is_disabled: false,
					is_indigenous: false,
					room_phone: "",
					socioeconomic_situation: "",
					graffar: null,
				}}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
