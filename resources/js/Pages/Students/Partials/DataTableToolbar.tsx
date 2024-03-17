import { router, usePage } from "@inertiajs/react";
import debounce from "lodash.debounce";
import { Filter } from "lucide-react";
import { useEffect, type ChangeEvent, useMemo } from "react";

import { DataTableFacetedFilter } from "@/Components/DataTableFacetedFilter";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/Components/ui/popover";

import { StudentsPageProps } from "../Index";

export function DataTableToolbar() {
	const { filters, careers, headquarters } =
		usePage<StudentsPageProps>().props;

	// Updates the search query.
	const onSearchTermChange = useMemo(
		() =>
			debounce((e: ChangeEvent<HTMLInputElement>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						search: e.target.value,
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the careers query,
	const onSelectCareerChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						careers: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the headquarters query,
	const onSelectHeadquarterChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						headquarters: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 500),
		[filters],
	);

	// Updates the sex query,
	const onSelectSexChange = useMemo(
		() =>
			debounce((selectedValues: Set<string>) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						sex: Array.from(selectedValues),
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 250),
		[filters],
	);

	// Updates the is disabled query,
	const onDisabledChange = useMemo(
		() =>
			debounce((isDisabled: boolean) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						is_disabled_only: isDisabled,
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 250),
		[filters],
	);

	// Updates the senior query,
	const onSeniorChange = useMemo(
		() =>
			debounce((isSenior: boolean) => {
				router.get(
					route("students.index"),
					{
						...filters,
						page: 1,
						is_senior_only: isSenior,
					},
					{
						preserveState: true,
						replace: true,
						only: ["students", "filters"],
					},
				);
			}, 250),
		[filters],
	);

	useEffect(() => {
		return () => {
			onSearchTermChange.cancel();
			onSelectCareerChange.cancel();
			onSelectHeadquarterChange.cancel();
			onSelectSexChange.cancel();
			onDisabledChange.cancel();
			onSeniorChange.cancel();
		};
	}, [
		onSearchTermChange,
		onSelectCareerChange,
		onSelectHeadquarterChange,
		onSelectSexChange,
		onDisabledChange,
		onSeniorChange,
	]);

	return (
		<div className="flex flex-1 flex-col items-center gap-2 sm:flex-row">
			<Input
				id="students-search"
				defaultValue={filters.search}
				type="search"
				placeholder="Buscar por nombre, cédula, correo o teléfono"
				onChange={onSearchTermChange}
				className="h-8 w-full sm:max-w-xs"
			/>

			<div className="flex w-full gap-2">
				<div className="grid w-full grid-cols-3 items-center gap-2 sm:flex sm:w-auto">
					<DataTableFacetedFilter
						defaultValues={filters.careers}
						onChange={onSelectCareerChange}
						title="Carreras"
						options={careers.map((career) => ({
							label: career.name,
							value: String(career.id),
						}))}
					/>

					<DataTableFacetedFilter
						defaultValues={filters.headquarters}
						onChange={onSelectHeadquarterChange}
						title="Sedes"
						options={headquarters.map((headquarter) => ({
							label: headquarter.name,
							value: String(headquarter.id),
						}))}
					/>

					<DataTableFacetedFilter
						defaultValues={filters.sex}
						onChange={onSelectSexChange}
						title="Sexo"
						options={[
							{
								label: "Masculino",
								value: "M",
							},
							{
								label: "Femenino",
								value: "F",
							},
						]}
					/>
				</div>

				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={
								filters.is_disabled_only ||
								filters.is_senior_only
									? "secondary"
									: "ghost"
							}
							size="icon"
						>
							<Filter className="h-4 w-4" />
						</Button>
					</PopoverTrigger>

					<PopoverContent className="space-y-4">
						<h4 className="font-medium leading-none">Filtros</h4>

						<div className="space-y-2">
							<Label className="flex items-center">
								<Checkbox
									className="mr-2"
									checked={filters.is_disabled_only}
									onCheckedChange={(checked) => {
										onDisabledChange(
											typeof checked === "boolean"
												? checked
												: false,
										);
									}}
								/>

								<span>Solo discapacitados</span>
							</Label>

							<Label className="flex items-center">
								<Checkbox
									className="mr-2"
									checked={filters.is_senior_only}
									onCheckedChange={(checked) => {
										onSeniorChange(
											typeof checked === "boolean"
												? checked
												: false,
										);
									}}
								/>

								<span>Solo adultos mayores</span>
							</Label>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
