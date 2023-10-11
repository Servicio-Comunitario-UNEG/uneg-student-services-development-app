import { ComponentProps } from "react";
import CardRadioGroup from "./CardRadioGroup";
import InputError from "./InputError";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

interface Props {
	legendProps: Omit<
		React.LabelHTMLAttributes<HTMLLegendElement>,
		"className"
	>;
	cardRadioGroupProps: ComponentProps<typeof CardRadioGroup>;

	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function CardRadioGroupField({
	legendProps,
	cardRadioGroupProps,
	description,
	errorMessage,
	className,
	isOptional = false,
}: Props) {
	return (
		<fieldset className={cn("space-y-2", className)}>
			<div className="flex items-center justify-between">
				<Label asChild>
					<legend {...legendProps} />
				</Label>

				{isOptional ? (
					<span className="text-sm text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			<p className="text-sm text-muted-foreground">{description}</p>

			<CardRadioGroup
				aria-invalid={errorMessage ? true : false}
				{...cardRadioGroupProps}
			/>

			<InputError message={errorMessage} />
		</fieldset>
	);
}
