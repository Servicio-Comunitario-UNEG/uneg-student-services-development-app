import { CheckedState } from "@radix-ui/react-checkbox";
import { createContext, useState } from "react";

type SelectionProviderState = {
	data: {
		selected: number[];
		unselected: number[];
	};
	toggle: (key: number, checked: CheckedState) => void;
	clear: () => void;
};

export const SelectionProviderContext = createContext<SelectionProviderState>(
	null!,
);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
	const [selection, setSelection] = useState<SelectionProviderState["data"]>({
		selected: [],
		unselected: [],
	});

	return (
		<SelectionProviderContext.Provider
			value={{
				data: selection,
				toggle(key, checkedState) {
					setSelection((previous) => {
						if (!checkedState) {
							// Pass key to unselected.
							return {
								selected: previous.selected.filter(
									(item) => item !== key,
								),
								unselected: [...previous.unselected, key],
							};
						}

						// Pass key to selected.
						return {
							selected: [...previous.selected, key],
							unselected: previous.unselected.filter(
								(item) => item !== key,
							),
						};
					});
				},
				clear: () =>
					setSelection({
						selected: [],
						unselected: [],
					}),
			}}
		>
			{children}
		</SelectionProviderContext.Provider>
	);
}
