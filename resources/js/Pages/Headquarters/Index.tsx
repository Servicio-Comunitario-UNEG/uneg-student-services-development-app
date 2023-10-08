import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import type { Headquarter, PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import CreateHeadquarterFormDialog from "./Partials/CreateHeadquarterFormDialog";

export default function Index({
	auth,
	headquarters,
}: PageProps<{ headquarters: Headquarter[] }>) {
	return (
		<AuthenticatedLayout
			user={auth.user}
			headerProps={{
				title: "Sedes",
				description:
					"Las sedes son los lugares donde se encuentra la universidad.",
				actions: <CreateHeadquarterFormDialog />,
			}}
		>
			<Head title="Sedes" />

			<pre className="whitespace-break-spaces">
				{JSON.stringify(headquarters, null, 2)}
			</pre>
		</AuthenticatedLayout>
	);
}
