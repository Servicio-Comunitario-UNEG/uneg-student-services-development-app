import { Head } from "@inertiajs/react";

import { PageProps, Role } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditUserForm from "./Partials/CreateOrEditUserForm";

export default function Create({ roles }: PageProps<{ roles: Role[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Crear Usuario",
			}}
		>
			<Head title="Crear Usuario" />

			<CreateOrEditUserForm
				callToAction="Crear"
				initialValues={{
					name: "",
					email: "",
					password: "",
					identity_card: {
						nationality: "V",
						serial: "",
					},
					role_name: roles.length ? roles[0].name : undefined,
				}}
				roles={roles}
			/>
		</PageLayout>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
