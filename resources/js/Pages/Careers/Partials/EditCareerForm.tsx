import type { ComponentProps } from "react";

import CreateOrEditCareerForm from "./CreateOrEditCareerForm";

export default function EditCareerForm({
	initialValues,
	onSuccess,
}: Omit<
	ComponentProps<typeof CreateOrEditCareerForm>,
	"callToAction" | "isUpdate"
>) {
	return (
		<CreateOrEditCareerForm
			initialValues={initialValues}
			onSuccess={onSuccess}
			callToAction="Editar"
			isUpdate
		/>
	);
}
