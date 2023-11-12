import { Head, Link } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { Button } from "@/Components/ui/button";

export default function Index() {
	return (
		<PageLayout
			headerProps={{
				title: "Estudiantes",
				actions: (
					<Button asChild>
						<Link href={route("students.create")}>Crear</Link>
					</Button>
				),
			}}
		>
			<Head title="Estudiantes" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
