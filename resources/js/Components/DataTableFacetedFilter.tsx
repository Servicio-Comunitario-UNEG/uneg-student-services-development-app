import { CheckIcon, PlusCircleIcon } from "lucide-react";

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
import { type ComponentType, useState, useEffect } from "react";

interface DataTableFacetedFilterProps {
	defaultValues?: string[];
	onChange?: (selectedValues: string[]) => void;
	title?: string;
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
}: DataTableFacetedFilterProps) {
	const [selectedValues, setSelectedValues] =
		useState<string[]>(defaultValues);

	useEffect(() => {
		if (onChange) onChange(selectedValues);
	}, [selectedValues, onChange]);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="h-8 border-dashed"
				>
					<PlusCircleIcon className="mr-2 h-4 w-4" />

					{title}

					{selectedValues?.length > 0 && (
						<>
							<Separator
								orientation="vertical"
								className="mx-2 h-4"
							/>

							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								{selectedValues.length}
							</Badge>

							<div className="hidden space-x-1 lg:flex">
								{selectedValues.length > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.length} seleccionados
									</Badge>
								) : (
									options
										.filter((option) =>
											selectedValues.includes(
												option.value,
											),
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
								const isSelected = selectedValues.includes(
									option.value,
								);

								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											setSelectedValues(
												(selectedValues) => {
													if (isSelected) {
														return selectedValues.filter(
															(selected) =>
																selected !==
																option.value,
														);
													}

													return selectedValues.concat(
														option.value,
													);
												},
											);
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

						{selectedValues.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() =>
											setSelectedValues(() => [])
										}
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
