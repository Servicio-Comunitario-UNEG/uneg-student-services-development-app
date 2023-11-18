import { SelectProps } from "@radix-ui/react-select";

import { User } from "@/types";

import { cn } from "@/lib/utils";

import InputError from "./InputError";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "htmlFor" | "onValueChange"
	>;
	selectProps: Omit<SelectProps, "id" | "onValueChange"> & {
		onValueChange: (value: User["identity_card"]["nationality"]) => void;
	};
	inputProps: Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;
	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function IdentityCardField({
	id,
	selectProps,
	labelProps,
	inputProps,
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

			<div className="flex gap-2">
				<Select {...selectProps}>
					<SelectTrigger id={id} className="w-16">
						<SelectValue placeholder="N" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="V">V</SelectItem>
						<SelectItem value="E">E</SelectItem>
					</SelectContent>
				</Select>

				<Input
					aria-invalid={errorMessage ? true : false}
					{...inputProps}
				/>
			</div>

			<InputError message={errorMessage} />
		</div>
	);
}
