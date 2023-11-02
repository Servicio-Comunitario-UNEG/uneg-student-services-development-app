import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Create() {
	return (
		<PageLayout
			headerProps={{
				title: "Crear estudiante",
			}}
		/>
	);
}

Create.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
