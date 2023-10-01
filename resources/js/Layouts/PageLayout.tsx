import Header from "./Partials/Header";

export default function PageLayout({
	headerProps,
	children,
}: {
	headerProps?: React.ComponentProps<typeof Header>;
	children?: React.ReactNode | React.ReactNode[];
}) {
	return (
		<div className="space-y-6">
			{headerProps ? <Header {...headerProps} /> : null}

			<main>{children}</main>
		</div>
	);
}
