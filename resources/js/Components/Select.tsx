import type { SelectProps } from "@radix-ui/react-select";
import { useEffect, useState } from "react";

import {
	Select as ShadcnSelect,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface Props {
	id: string;
	selectProps: Omit<SelectProps, "className" | "name">;
	options: {
		label: React.ReactNode | React.ReactNode[];
		value: string;
	}[];
	placeholder?: string;
	className?: string;
}

export default function Select({
	id,
	selectProps: { defaultValue, ...restOfSelectProps },
	placeholder,
	options,
	className,
}: Props) {
	const [value, setValue] = useState(defaultValue);

	// Reset the value.
	useEffect(() => {
		const hasOption = options.some((option) => option.value === value);

		if (!hasOption && value) setValue("");
	}, [options, value]);

	return (
		<ShadcnSelect
			name={id}
			{...restOfSelectProps}
			value={value}
			onValueChange={(value) => {
				setValue(value);
				restOfSelectProps.onValueChange?.(value);
			}}
		>
			<SelectTrigger className={className} id={id}>
				<SelectValue
					placeholder={placeholder ?? "Seleccione una opción"}
				/>
			</SelectTrigger>

			<SelectContent className="max-h-[250px] overflow-auto">
				{options.map(({ label, value }) => (
					<SelectItem key={value} value={value}>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</ShadcnSelect>
	);
}
