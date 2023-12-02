import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import InputError from "./InputError";
import RadioGroup from "./RadioGroup";
import { Label } from "./ui/label";

interface Props {
	legendProps: Omit<
		React.LabelHTMLAttributes<HTMLLegendElement>,
		"className"
	>;
	radioGroupProps: ComponentProps<typeof RadioGroup>;
	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function RadioGroupField({
	legendProps,
	description,
	errorMessage,
	className,
	radioGroupProps,
	isOptional = false,
}: Props) {
	return (
		<fieldset className={cn("space-y-3", className)}>
			<div className="flex items-center justify-between">
				<Label asChild>
					<legend {...legendProps} />
				</Label>

				{isOptional ? (
					<span className="text-xs text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			{description ? (
				<p className="text-sm text-muted-foreground">{description}</p>
			) : null}

			<RadioGroup
				aria-invalid={Boolean(errorMessage)}
				{...radioGroupProps}
			/>

			<InputError message={errorMessage} />
		</fieldset>
	);
}
