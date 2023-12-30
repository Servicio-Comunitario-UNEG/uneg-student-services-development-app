import { Checkbox } from "@/Components/ui/checkbox";

import { useSelection } from "@/hooks/useSelection";

export default function SelectionCheckbox({ id }: { id: number }) {
	const selection = useSelection();

	return (
		<Checkbox
			checked={selection.data.selected.includes(id)}
			onCheckedChange={() => selection.toggle(id)}
			aria-label="Seleccionar fila"
		/>
	);
}
