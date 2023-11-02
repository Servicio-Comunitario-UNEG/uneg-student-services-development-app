import { Head, Link } from "@inertiajs/react";
import { Plus } from "lucide-react";

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
						<Link href={route("students.create")}>
							<Plus className="mr-2 h-4 w-4" />

							<span>Crear estudiante</span>
						</Link>
					</Button>
				),
			}}
		>
			<Head title="Estudiantes" />
		</PageLayout>
	);
}

Index.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
