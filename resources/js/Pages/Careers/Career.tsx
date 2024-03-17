import { Head } from "@inertiajs/react";

import { Career as CareerType, Headquarter, PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DescriptionList } from "@/Components/DescriptionList";

export default function Career({
	career,
}: PageProps<{
	career: CareerType & { headquarters: Headquarter[] };
}>) {
	return (
		<PageLayout
			headerProps={{
				title: career.name,
				description: "Detalles de la carrera.",
			}}
		>
			<Head title={`${career.name} | Carrera`} />

			<DescriptionList
				items={[
					{
						title: "Nombre",
						children: career.name,
					},
					{
						title: "Sedes",
						children: (
							<ul className="space-y-2">
								{career.headquarters.map((headquarter) => (
									<li key={headquarter.id}>
										{headquarter.name}
									</li>
								))}
							</ul>
						),
					},
				]}
			/>
		</PageLayout>
	);
}

Career.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
