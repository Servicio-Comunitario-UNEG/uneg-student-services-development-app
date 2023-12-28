import { createContext, useState } from "react";

type SelectionProviderState = {
	selected: number[];
	toggle: (key: number) => void;
	clear: () => void;
};

export const SelectionProviderContext = createContext<SelectionProviderState>(
	null!,
);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
	const [selected, setSelected] = useState<number[]>([]);

	return (
		<SelectionProviderContext.Provider
			value={{
				selected,
				toggle(key) {
					setSelected((previous) => {
						if (previous.includes(key)) {
							return previous.filter((item) => item !== key);
						}

						return [...previous, key];
					});
				},
				clear: () => setSelected([]),
			}}
		>
			{children}
		</SelectionProviderContext.Provider>
	);
}
