import { Head, Link } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

export default function Index() {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Apoyos",
				description:
					"Administra los apoyos que reciben los estudiantes.",
				actions: gate.allows("create supports") ? (
					<Button asChild>
						<Link href={route("supports.create")}>Crear</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Apoyos" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
