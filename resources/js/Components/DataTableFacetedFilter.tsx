import { useSet } from "@uidotdev/usehooks";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { type ComponentType } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

interface DataTableFacetedFilterProps {
	defaultValues?: string[];
	onChange?: (selectedValues: Set<string>) => void;
	title?: string;
	className?: string;
	options: {
		label: string;
		value: string;
		icon?: ComponentType<{ className?: string }>;
	}[];
}

export function DataTableFacetedFilter({
	onChange,
	title,
	options,
	defaultValues = [],
	className,
}: DataTableFacetedFilterProps) {
	const selectedValues = useSet<string>(defaultValues);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className={cn("h-8 border-dashed", className)}
				>
					<PlusCircleIcon className="mr-2 h-4 w-4" />

					{title}

					{selectedValues.size > 0 && (
						<>
							<Separator
								orientation="vertical"
								className="mx-2 h-4"
							/>

							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.size}
							</Badge>

							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 1 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.size} seleccionados
									</Badge>
								) : (
									options
										.filter((option) =>
											selectedValues.has(option.value),
										)
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>
							No se encontraron resultados.
						</CommandEmpty>

						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedValues.has(
									option.value,
								);

								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isSelected) {
												selectedValues.delete(
													option.value,
												);
											} else {
												selectedValues.add(
													option.value,
												);
											}

											if (onChange)
												onChange(selectedValues);
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible",
											)}
										>
											<CheckIcon
												className={cn("h-4 w-4")}
											/>
										</div>

										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}

										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>

						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => {
											selectedValues.clear();

											if (onChange)
												onChange(selectedValues);
										}}
										className="justify-center text-center"
									>
										Remover filtros
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
