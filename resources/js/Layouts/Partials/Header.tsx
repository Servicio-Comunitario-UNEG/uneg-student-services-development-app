export default function Header({
	title,
	description,
	actions,
}: {
	title: string;
	description?: string;
	actions?: React.ReactNode;
}) {
	return (
		<header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold leading-tight">{title}</h1>

				{description ? (
					<p className="text-muted-foreground">{description}</p>
				) : null}
			</div>

			{actions ? <div className="w-fit">{actions}</div> : null}
		</header>
	);
}
