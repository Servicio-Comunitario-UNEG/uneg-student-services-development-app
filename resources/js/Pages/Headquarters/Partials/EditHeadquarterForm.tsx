import type { ComponentProps } from "react";
import CreateOrEditHeadquarterForm from "./CreateOrEditHeadquarterForm";

export default function EditHeadquarterForm({
	initialValues,
	onSuccess,
}: Omit<
	ComponentProps<typeof CreateOrEditHeadquarterForm>,
	"callToAction" | "isUpdate"
>) {
	return (
		<CreateOrEditHeadquarterForm
			initialValues={initialValues}
			onSuccess={onSuccess}
			callToAction="Editar"
			isUpdate
		/>
	);
}
