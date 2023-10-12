import { Head } from "@inertiajs/react";
import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
	return (
		<AuthenticatedLayout
			headerProps={{
				title: "Dashboard",
			}}
		>
			<Head title="Dashboard" />
		</AuthenticatedLayout>
	);
}
