import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { LabelProps } from "@radix-ui/react-label";

export function CheckboxField({
	id,
	checkboxProps,
	labelProps,
}: {
	id: string;
	checkboxProps?: Omit<CheckboxProps, "id">;
	labelProps?: Omit<LabelProps, "htmlFor">;
}) {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id={id} {...checkboxProps} />

			<Label htmlFor={id} {...labelProps} />
		</div>
	);
}
