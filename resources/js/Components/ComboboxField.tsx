import { ComponentProps } from "react";
import Combobox from "./Combobox";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import InputError from "./InputError";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "htmlFor"
	>;
	comboboxProps: ComponentProps<typeof Combobox>;
	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function ComboboxField({
	id,
	labelProps,
	comboboxProps,
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
					<span className="text-sm text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			<p className="text-sm text-muted-foreground">{description}</p>

			<Combobox
				buttonProps={{
					id,
					"aria-invalid": errorMessage ? true : false,
					name: id,
				}}
				{...comboboxProps}
			/>

			<InputError message={errorMessage} />
		</div>
	);
}
