import ApplicationLogo from "@/Components/ApplicationLogo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/Components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({
	children,
	title,
	description,
}: PropsWithChildren<{
	title?: string;
	description?: string;
}>) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center space-y-6 px-4 sm:container">
			<div className="space-y-4">
				<div className="flex justify-center">
					<Link href="/">
						<ApplicationLogo
							height={64}
							width={64}
							className="object-contain"
						/>
					</Link>
				</div>

				<h1 className="text-center text-3xl font-bold">{title}</h1>
			</div>

			<Card className="w-full max-w-lg">
				{description ? (
					<CardHeader>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
				) : null}

				<CardContent className={cn(description || "p-6")}>
					{children}
				</CardContent>
			</Card>
		</div>
	);
}
