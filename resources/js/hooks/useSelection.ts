import { SelectionProviderContext } from "@/context/SelectionProvider";
import { useContext } from "react";

export const useSelection = () => {
	const context = useContext(SelectionProviderContext);

	if (context === undefined) {
		throw new Error("useSelection must be used within a SelectionProvider");
	}

	return context;
};
