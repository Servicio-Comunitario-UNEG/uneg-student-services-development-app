import { Head } from "@inertiajs/react";
import dayjs from "dayjs";

import { PageProps } from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DescriptionList } from "@/Components/DescriptionList";

import { serviceTypeLabel } from "@/lib/constants";

import { ServiceWithUserAndStudent } from "./Index";

export default function Service({
	service: { date, student, user, professional, type, description },
}: PageProps<{
	service: ServiceWithUserAndStudent;
}>) {
	return (
		<PageLayout
			headerProps={{
				title: "Servicio",
				description: "Detalle del servicio suministrado.",
			}}
		>
			<Head title="Servicio" />

			<DescriptionList
				items={[
					{
						title: "Fecha",
						children: dayjs(date).format("DD/MM/YYYY"),
					},
					{
						title: "Tipo",
						children: serviceTypeLabel[type],
					},
					{
						title: "Creador",
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
						title: "Profesional",
						children: professional ? (
							<div className="space-y-2">
								<p>{professional.name}</p>

								<p>
									{professional.identity_card.nationality}
									{professional.identity_card.serial}
								</p>
							</div>
						) : (
							"No aplica"
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

Service.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
