import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Button, ButtonProps } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Option = Record<"value" | "label", string>;

export default function MultiSelectCombobox({
	options,
	placeholder,
	emptyTitle,
	buttonProps,
	selectedValues,
	setSelectedValues,
}: {
	selectedValues: Option[];
	setSelectedValues: (options: Option[]) => void;
	options: Option[];
	placeholder: string;
	emptyTitle?: string;
	buttonProps?: Omit<
		ButtonProps,
		"variant" | "role" | "aria-expanded" | "className"
	>;
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen} modal>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					className={cn(
						"h-full min-h-[40px] w-full justify-between hover:bg-transparent",
						!selectedValues.length && "text-muted-foreground",
					)}
					aria-expanded={open}
					{...buttonProps}
				>
					{selectedValues.length ? (
						<div className="flex flex-wrap gap-1">
							{selectedValues.map((option) => {
								return (
									<Badge
										key={option.value}
										variant="secondary"
									>
										{option.label}
									</Badge>
								);
							})}
						</div>
					) : (
						placeholder
					)}

					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				style={{
					// Use the popover trigger width.
					width: "var(--radix-popover-trigger-width)",
				}}
				className="p-0"
			>
				<Command>
					<CommandInput placeholder={placeholder} />

					<CommandList className="max-h-40">
						<CommandEmpty>
							{emptyTitle ?? "No hay resultados disponibles."}
						</CommandEmpty>

						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.some(
									(selected) =>
										selected.value === option.value,
								);

								return (
									<CommandItem
										key={option.value}
										value={option.label}
										onSelect={() => {
											// Unselect option when is already selected.
											setSelectedValues(
												isSelected
													? selectedValues.filter(
															(s) =>
																s.value !==
																option.value,
														)
													: [
															...selectedValues,
															option,
														],
											);
										}}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												isSelected
													? "opacity-100"
													: "opacity-0",
											)}
										/>

										{option.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
