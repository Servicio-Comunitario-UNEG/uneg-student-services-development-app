import { Menu } from "lucide-react";

import ApplicationLogo from "@/Components/ApplicationLogo";
import { Button } from "@/Components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";

import { cn } from "@/lib/utils";

import SideBar from "./SideBar";

export default function NavBar({
	className,
	...props
}: React.ComponentPropsWithoutRef<"nav">) {
	return (
		<nav
			className={cn(
				"supports-backdrop-blur:bg-background/60 sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur",
				className,
			)}
			{...props}
		>
			<div className="flex h-14 items-center justify-between px-6">
				<ApplicationLogo height={24} width={24} />

				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<Menu className="h-4 w-4" />
						</Button>
					</SheetTrigger>

					<SheetContent>
						<SideBar className="min-h-full w-full border-0 p-0 pt-6" />
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	);
}
