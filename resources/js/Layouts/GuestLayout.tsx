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
import BaseLayout from "./BaseLayout";

export default function GuestLayout({
	children,
	title,
	subtitle,
	description,
}: PropsWithChildren<{
	title?: string;
	subtitle?: string;
	description?: string;
}>) {
	return (
		<BaseLayout>
			<div className="relative flex min-h-screen flex-col items-center justify-center space-y-6 px-4 sm:container">
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

					<div className="w-full max-w-lg space-y-2 text-center">
						<h1 className="text-3xl font-bold">{title}</h1>

						{subtitle ? (
							<p className="text-muted-foreground">{subtitle}</p>
						) : null}
					</div>
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
		</BaseLayout>
	);
}
