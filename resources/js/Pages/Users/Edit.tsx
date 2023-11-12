import { Head } from "@inertiajs/react";

import { PageProps, Role, User } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import CreateOrEditUserForm from "./Partials/CreateOrEditUserForm";

export default function Edit({
	user,
	roles,
}: PageProps<{ user: User; roles: Role[] }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Editar Usuario",
			}}
		>
			<Head title="Editar Usuario" />

			<CreateOrEditUserForm
				callToAction="Guardar cambios"
				initialValues={{
					...user,
					role_name: user.current_role.name,
				}}
				roles={roles}
				isUpdate
			/>
		</PageLayout>
	);
}

Edit.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
