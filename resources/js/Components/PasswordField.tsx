import { cn } from "@/lib/utils";
import InputError from "./InputError";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
	id: string;
	labelProps: Omit<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		"className" | "htmlFor"
	>;
	inputProps: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"className" | "id" | "name" | "type"
	>;
	errorMessage?: string;
	className?: string;
	description?: string;
}

export default function PasswordField({
	id,
	labelProps,
	inputProps,
	description,
	errorMessage,
	className,
}: Props) {
	const [canShowPassword, setCanShowPassword] = useState(false);

	return (
		<div className={cn("space-y-2", className)}>
			<Label htmlFor={id} {...labelProps}></Label>

			<p className="text-sm text-muted-foreground">{description}</p>

			<div className="flex gap-2">
				<Input
					id={id}
					type={canShowPassword ? "text" : "password"}
					name={id}
					aria-invalid={errorMessage ? true : false}
					spellCheck="false"
					{...inputProps}
				/>

				<Button
					aria-controls={id}
					aria-expanded={canShowPassword}
					variant="ghost"
					size="icon"
					type="button"
					onClick={() => setCanShowPassword((prev) => !prev)}
				>
					{canShowPassword ? (
						<EyeOff className="h-4 w-4" />
					) : (
						<Eye className="h-4 w-4" />
					)}

					<span className="sr-only">
						{canShowPassword
							? "Ocultar contraseña"
							: "Mostrar contraseña"}
					</span>
				</Button>
			</div>

			<InputError message={errorMessage} />
		</div>
	);
}
