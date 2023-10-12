import type { ComponentProps } from "react";
import CreateOrEditUserForm from "./CreateOrEditUserForm";

export default function EditUserForm({
	initialValues,
	onSuccess,
	headquarters,
	roles,
}: Omit<
	ComponentProps<typeof CreateOrEditUserForm>,
	"callToAction" | "isUpdate"
>) {
	return (
		<CreateOrEditUserForm
			initialValues={initialValues}
			onSuccess={onSuccess}
			callToAction="Editar"
			headquarters={headquarters}
			roles={roles}
			isUpdate
		/>
	);
}
