import { Head } from "@inertiajs/react";
import dayjs from "dayjs";

import {
	Career,
	Headquarter,
	PageProps,
	Student as StudentType,
} from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DescriptionList } from "@/Components/DescriptionList";

import { getFullName } from "@/lib/utils";

export default function Student({
	student,
}: PageProps<{
	student: StudentType & {
		career_headquarter: {
			career: Career;
			headquarter: Headquarter;
		};
	};
}>) {
	return (
		<PageLayout
			headerProps={{
				title: `${student.first_name} ${student.last_name}`,
				description:
					"Detalles personales, académicos y socieconómicos del estudiante.",
			}}
		>
			<Head
				title={`${student.first_name} ${student.last_name} | Estudiante`}
			/>

			<DescriptionList
				items={[
					{
						title: "Nombre Completo",
						children: getFullName(student),
					},
					{
						title: "Cédula de Identidad",
						children: `${student.identity_card.nationality}${student.identity_card.serial}`,
					},
					{
						title: "Fecha de Nacimiento",
						children: dayjs(student.birth_date).format(
							"DD/MM/YYYY",
						),
					},
					{
						title: "Sexo",
						children:
							student.sex === "M" ? "Masculino" : "Femenino",
					},
					{
						title: "Carrera",
						children: student.career_headquarter.career.name,
					},
					{
						title: "Sede",
						children: student.career_headquarter.headquarter.name,
					},
					{
						title: "Correo Electrónico",
						children: student.email,
					},
					{
						title: "Teléfono Principal",
						children: student.cell_phone,
					},
					{
						title: "Teléfono Alternativo",
						children: student.room_phone,
					},
					{
						title: "Dirección",
						children: student.address,
					},
					{
						title: "¿Posee una discapacidad?",
						children: student.is_disabled ? "Si" : "No",
					},
					{
						title: "¿Es indigena?",
						children: student.is_indigenous ? "Si" : "No",
					},
					{
						title: "Graffar",
						children: student.graffar,
					},
					{
						title: "Situación Socioeconómica",
						children: student.socioeconomic_situation,
					},
				]}
			/>
		</PageLayout>
	);
}

Student.layout = (page: React.JSX.Element) => (
	<AuthenticatedLayout children={page} />
);
