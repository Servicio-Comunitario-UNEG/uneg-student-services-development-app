import { Head, Link } from "@inertiajs/react";

import {
	Benefit,
	BenefitSemester,
	BenefitSemesterHeadquarter,
	Headquarter,
	PageProps,
} from "@/types";

import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout";
import PageLayout from "@/Layouts/PageLayout";

import { DescriptionList } from "@/Components/DescriptionList";
import { Button } from "@/Components/ui/button";

import { useGate } from "@/hooks/useGate";

export default function View({
	benefit_semester,
}: PageProps<{
	benefit_semester: BenefitSemester & {
		benefit: Benefit;
		benefit_semester_headquarters: Array<
			BenefitSemesterHeadquarter & {
				headquarter: Headquarter;
			}
		>;
	};
}>) {
	const gate = useGate();

	return (
		<PageLayout
			headerProps={{
				title: "Detalle de Beneficio",
				description:
					"Observa las asignaciones de este beneficio en el semestre seleccionado.",
				actions: gate.allows("create benefits") ? (
					<Button asChild>
						<Link
							href={route(
								"benefits-semesters.edit",
								benefit_semester.id,
							)}
						>
							Editar
						</Link>
					</Button>
				) : null,
			}}
		>
			<Head title="Detalle de Beneficio" />

			<DescriptionList
				items={[
					{
						title: "Nombre",
						children: benefit_semester.benefit.name,
					},
					{
						title: "Cantidad",
						children: benefit_semester.amount,
					},
					{
						title: "Sedes",
						children: (
							<div className="space-y-2">
								{benefit_semester.benefit_semester_headquarters.map(
									(item) => (
										<p key={item.id}>
											{item.headquarter.name} (
											{item.amount})
										</p>
									),
								)}
							</div>
						),
					},
				]}
			/>
		</PageLayout>
	);
}

View.layout = (page: JSX.Element) => <AuthenticatedLayout children={page} />;
