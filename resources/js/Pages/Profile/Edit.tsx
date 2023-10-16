import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Edit({
	mustVerifyEmail,
	status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
	return (
		<PageLayout
			headerProps={{
				title: "Perfil",
			}}
		>
			<Head title="Perfil" />

			<div className="space-y-6">
				<UpdateProfileInformationForm
					mustVerifyEmail={mustVerifyEmail}
					status={status}
					className="max-w-xl"
				/>

				<UpdatePasswordForm className="max-w-xl" />

				<DeleteUserForm className="max-w-xl" />
			</div>
		</PageLayout>
	);
}

Edit.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
