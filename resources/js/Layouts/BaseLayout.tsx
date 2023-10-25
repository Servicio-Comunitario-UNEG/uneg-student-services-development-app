import { usePage } from "@inertiajs/react";
import { useEffect, type ReactNode } from "react";

import type { PageProps } from "@/types";

import { Toaster } from "@/Components/ui/toaster";
import { useToast } from "@/Components/ui/use-toast";

export default function BaseLayout({
	children,
}: {
	children: ReactNode | ReactNode[];
}) {
	const { toast } = useToast();
	const { message } = usePage<PageProps>().props.flash;

	useEffect(() => {
		if (message) toast({ description: message });
	}, [toast, message]);

	return (
		<>
			{children}

			<Toaster />
		</>
	);
}
