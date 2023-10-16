import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Dashboard() {
	return (
		<PageLayout
			headerProps={{
				title: "Dashboard",
			}}
		>
			<Head title="Dashboard" />
		</PageLayout>
	);
}

Dashboard.layout = (page: JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
