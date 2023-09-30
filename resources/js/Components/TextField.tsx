import { cn } from "@/lib/utils";
import InputError from "./InputError";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "htmlFor"
	>;
	inputProps: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "id" | "name"
	>;
	errorMessage?: string;
	className?: string;
	description?: string;
	isOptional?: boolean;
}

export default function TextField({
	id,
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
					<span className="text-sm text-muted-foreground">
						Opcional
					</span>
				) : null}
			</div>

			<p className="text-sm text-muted-foreground">{description}</p>

			<Input
				id={id}
				name={id}
				aria-invalid={errorMessage ? true : false}
				{...inputProps}
			/>

			<InputError message={errorMessage} />
		</div>
	);
}
