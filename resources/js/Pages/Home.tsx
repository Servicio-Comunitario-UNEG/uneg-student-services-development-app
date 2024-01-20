import { Head } from "@inertiajs/react";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

export default function Home() {
	return (
		<PageLayout
			headerProps={{
				title: "Inicio",
			}}
		>
			<Head title="Inicio" />

			<div className="flex items-center">
				<p className="text-muted-foreground">
					Selecciona una de las opciones disponibles en el menú.
				</p>
			</div>
		</PageLayout>
	);
}

Home.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
