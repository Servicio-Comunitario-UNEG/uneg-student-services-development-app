import type { ReactNode } from "react";

import { Toaster } from "@/Components/ui/toaster";

export default function BaseLayout({
	children,
}: {
	children: ReactNode | ReactNode[];
}) {
	return (
		<>
			{children}

			<Toaster />
		</>
	);
}
