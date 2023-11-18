import type { ReactNode } from "react";

export function DescriptionList({
	items,
}: {
	items: {
		title: string;
		children: ReactNode | ReactNode[];
	}[];
}) {
	return (
		<section>
			<dl className="divide-y">
				{items.map((item) => (
					<div
						key={item.title}
						className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
					>
						<dt className="text-sm font-medium leading-6">
							{item.title}
						</dt>

						<dd className="mt-1 text-sm text-muted-foreground sm:col-span-2 sm:mt-0">
							{item.children}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
