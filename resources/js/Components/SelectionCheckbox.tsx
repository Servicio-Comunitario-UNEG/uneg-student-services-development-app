import { useSelection } from "@/hooks/useSelection";

import { Checkbox } from "./ui/checkbox";

export default function SelectionCheckbox({ id }: { id: number }) {
	const selection = useSelection();

	return (
		<Checkbox
			checked={selection.selected.includes(id)}
			onCheckedChange={() => selection.toggle(id)}
			aria-label="Seleccionar fila"
		/>
	);
}
