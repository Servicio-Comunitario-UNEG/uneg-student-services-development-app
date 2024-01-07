import { CheckedState } from "@radix-ui/react-checkbox";
import { createContext, useState } from "react";

type SelectionProviderState = {
	data: {
		/** The values that are known as selected. */
		defaultSelected: number[];
		/** The elements that are selected. */
		selected: number[];
		/** The elements that were selected. */
		unselected: number[];
	};
	/** Switches the element to selected or unselected based on checked. */
	toggle: (key: number, checked: CheckedState) => void;
	/** Switches all elements to selected or unselected. */
	toggleAll: (keys: number[], checked: CheckedState) => void;
	/** Clears all the values from the data. */
	clear: (shouldClearDefault?: boolean) => void;
	/** Sets the default selected data. */
	setDefault: (keys: number[]) => void;
};

export const SelectionProviderContext = createContext<SelectionProviderState>(
	null!,
);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
	const [selection, setSelection] = useState<SelectionProviderState["data"]>({
		selected: [],
		unselected: [],
		defaultSelected: [],
	});

	return (
		<SelectionProviderContext.Provider
			value={{
				data: selection,
				toggle(key, checked) {
					setSelection((previous) => {
						if (!checked) {
							// Add to unselected when is selected by default.
							return {
								...previous,
								selected: previous.selected.filter(
									(item) => item !== key,
								),
								// Add to unselected only when it's originally selected.
								unselected: previous.defaultSelected.includes(
									key,
								)
									? [...previous.unselected, key]
									: previous.unselected,
							};
						}

						// Pass key to selected.
						return {
							...previous,
							// Add to select only when it's not originally selected.
							selected: previous.defaultSelected.includes(key)
								? previous.selected
								: [...previous.selected, key],
							unselected: previous.unselected.filter(
								(item) => item !== key,
							),
						};
					});
				},
				toggleAll(keys, checked) {
					/** @ts-expect-error - The values are filtered as number, but TS doesn't recognize it as number. */
					setSelection((previous) => {
						if (!checked) {
							const selected = previous.selected.filter(
								(value) => !keys.includes(value),
							);

							const unselected = keys
								.map((key) => {
									return previous.defaultSelected.includes(
										key,
									)
										? key
										: null;
								})
								.filter((value) => typeof value === "number");

							return {
								...previous,
								selected,
								unselected,
							};
						}

						const selected = keys
							.map((key) => {
								return previous.defaultSelected.includes(key)
									? null
									: key;
							})
							.filter((value) => typeof value === "number");

						const unselected = previous.unselected.filter(
							(value) => !keys.includes(value),
						);

						return {
							...previous,
							selected,
							unselected,
						};
					});
				},
				setDefault: (keys) =>
					setSelection((previous) => ({
						...previous,
						defaultSelected: keys,
					})),
				clear: (shouldClearDefault = true) =>
					setSelection((previous) => ({
						selected: [],
						unselected: [],
						defaultSelected: shouldClearDefault
							? []
							: previous.defaultSelected,
					})),
			}}
		>
			{children}
		</SelectionProviderContext.Provider>
	);
}
