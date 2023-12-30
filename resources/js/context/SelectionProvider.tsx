import { createContext, useState } from "react";

type SelectionProviderState = {
	data: {
		selected: number[];
		unselected: number[];
	};
	toggle: (key: number) => void;
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
				toggle(key) {
					setSelection((previous) => {
						// Pass key to unselected.
						if (previous.selected.includes(key)) {
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
