import { Head } from "@inertiajs/react";
import dayjs from "dayjs";

import { PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DescriptionList } from "@/Components/DescriptionList";

import { SupportWithUserAndStudent } from "./Index";

export default function Support({
	support: { date, student, user, type, description },
}: PageProps<{
	support: SupportWithUserAndStudent;
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Apoyo",
				description: "Detalle del apoyo suministrado.",
			}}
		>
			<Head title="Apoyo" />

			<DescriptionList
				items={[
					{
						title: "Fecha",
						children: dayjs(date).format("DD/MM/YYYY"),
					},
					{
						title: "Tipo",
						children: type === "medical" ? "Médico" : "Psicológico",
					},
					{
						title: "Profesional",
						children: (
							<div className="space-y-2">
								<p>{user.name}</p>

								<p>
									{user.identity_card.nationality}
									{user.identity_card.serial}
								</p>
							</div>
						),
					},
					{
						title: "Estudiante",
						children: (
							<div className="space-y-2">
								<p>
									{student.first_name} {student.last_name}
								</p>

								<p>
									{student.identity_card.nationality}
									{student.identity_card.serial}
								</p>
							</div>
						),
					},
					{
						title: "Descripción",
						children: description,
					},
				]}
			/>
		</PageLayout>
	);
}

Support.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
