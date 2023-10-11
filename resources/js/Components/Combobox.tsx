import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Combobox({
	emptyTitle,
	options,
	value,
	setValue,
	placeholder,
	buttonProps,
}: {
	buttonProps?: Omit<
		ButtonProps,
		"variant" | "role" | "aria-expanded" | "className"
	>;
	placeholder: string;
	value: string;
	setValue: (value: string) => void;
	emptyTitle: string;
	options: {
		label: string;
		value: string;
	}[];
}) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={cn(
						"w-full justify-between",
						!value && "text-muted-foreground",
					)}
					{...buttonProps}
				>
					{value
						? options.find((framework) => {
								return framework.value === value;
						  })?.label
						: placeholder}

					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={placeholder} />
					<CommandEmpty>{emptyTitle}</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option.value}
								value={option.label}
								onSelect={() => {
									setValue(option.value);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === option.value
											? "opacity-100"
											: "opacity-0",
									)}
								/>

								{option.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}