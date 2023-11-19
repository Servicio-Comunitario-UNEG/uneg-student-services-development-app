import { RadioGroupProps } from "@radix-ui/react-radio-group";

import { Label } from "./ui/label";
import { RadioGroup as RadioGroupBase, RadioGroupItem } from "./ui/radio-group";

export default function RadioGroup<T extends string>({
	options,
	...radioGroupProps
}: RadioGroupProps & {
	options: {
		label: string;
		value: T;
	}[];
}) {
	return (
		<RadioGroupBase {...radioGroupProps}>
			{options.map((option) => (
				<div className="flex items-center space-x-2" key={option.value}>
					<RadioGroupItem value={option.value} id={option.value} />

					<Label htmlFor={option.value}>{option.label}</Label>
				</div>
			))}
		</RadioGroupBase>
	);
}
