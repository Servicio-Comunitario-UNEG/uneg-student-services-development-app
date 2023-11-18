import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import InputError from "./InputError";
import MultiSelectCombobox from "./MultiSelectCombobox";
import { Label } from "./ui/label";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "htmlFor"
	>;
	multiSelectComboboxProps: ComponentProps<typeof MultiSelectCombobox>;
	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function MultiSelectComboboxField({
	id,
	labelProps,
	multiSelectComboboxProps,
	description,
	errorMessage,
	className,
	isOptional = false,
}: Props) {
	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex items-center justify-between">
				<Label htmlFor={id} {...labelProps}></Label>

				{isOptional ? (
					<span className="text-xs text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			{description ? (
				<p className="text-sm text-muted-foreground">{description}</p>
			) : null}

			<MultiSelectCombobox
				buttonProps={{
					id,
					"aria-invalid": Boolean(errorMessage),
					name: id,
				}}
				{...multiSelectComboboxProps}
			/>

			<InputError message={errorMessage} />
		</div>
	);
}
