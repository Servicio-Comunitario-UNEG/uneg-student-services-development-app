import type { RadioGroupProps } from "@radix-ui/react-radio-group";
import type { LucideIcon } from "lucide-react";

import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "@/lib/utils";

export default function CardRadioGroup<T extends string>({
	options,
	className,
	...radioGroupProps
}: Omit<RadioGroupProps, "className"> & {
	options: {
		Icon?: LucideIcon;
		label: string;
		value: T;
	}[];
	className?: string;
}) {
	return (
		<RadioGroup
			className={cn("grid grid-cols-3 gap-4", className)}
			{...radioGroupProps}
		>
			{options.map(({ Icon, label, value }) => (
				<Label
					key={value}
					htmlFor={value}
					className={cn(
						"flex flex-col items-center justify-center gap-3 rounded-md border-2 bg-popover p-4 text-center leading-4 hover:bg-accent hover:text-accent-foreground",
						radioGroupProps.value === value
							? "border-primary"
							: "border-muted",
					)}
				>
					<RadioGroupItem
						value={value}
						id={value}
						className="sr-only"
					/>

					{Icon ? <Icon className="h-6 w-6" /> : null}

					<span>{label}</span>
				</Label>
			))}
		</RadioGroup>
	);
}
