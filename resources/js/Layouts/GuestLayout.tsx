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
		<div className="container flex min-h-screen flex-col items-center justify-center space-y-6">
			<div className="space-y-4">
				<Link href="/" className="flex justify-center">
					<ApplicationLogo
						height={64}
						width={64}
						className="object-contain"
					/>
				</Link>

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
