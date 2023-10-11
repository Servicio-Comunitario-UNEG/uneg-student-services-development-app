import type { Headquarter, PageProps, User } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateUserFormDialog from "./Partials/CreateUserFormDialog";

export default function Index({
	auth,
	headquarters,
	users,
}: PageProps<{ headquarters: Headquarter[]; users: User[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Usuarios",
				description: "Administra los usuarios que acceden al sistema.",
				actions: <CreateUserFormDialog headquarters={headquarters} />,
			}}
		>
			<Head title="Usuarios" />

			<pre>{JSON.stringify(users, undefined, 2)}</pre>
		</AuthenticatedLayout>
	);
}
