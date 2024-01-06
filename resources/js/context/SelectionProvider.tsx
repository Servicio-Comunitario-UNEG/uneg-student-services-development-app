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
				toggle(key, checkedState) {
					setSelection((previous) => {
						if (!checkedState) {
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
