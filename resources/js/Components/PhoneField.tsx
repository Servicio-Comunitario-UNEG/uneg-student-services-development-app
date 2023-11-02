import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { cn } from "@/lib/utils";

import InputError from "./InputError";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "htmlFor"
	>;
	phoneInputProps: React.ComponentProps<typeof PhoneInput>;
	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function PhoneField({
	id,
	labelProps,
	phoneInputProps,
	description,
	errorMessage,
	className,
	isOptional = false,
}: Props) {
	return (
		<div className={cn("space-y-2", className)}>
			<div className="flex h-4 items-center justify-between">
				<Label htmlFor={id} {...labelProps}></Label>

				{isOptional ? (
					<span className="text-xs text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			<p className="text-sm text-muted-foreground">{description}</p>

			<PhoneInput
				className="flex gap-x-2"
				id={id}
				name={id}
				aria-invalid={errorMessage ? true : false}
				inputComponent={Input}
				{...phoneInputProps}
			/>

			<InputError message={errorMessage} />
		</div>
	);
}
