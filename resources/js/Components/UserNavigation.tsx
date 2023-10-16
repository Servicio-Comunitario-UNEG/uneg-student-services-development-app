import { PageProps } from "@/types";
import { ChevronDown, LogOut, UserCog } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link, usePage } from "@inertiajs/react";

export default function UserNavigation() {
	const user = usePage<PageProps>().props.auth.user;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<span>{user.name}</span>

					<ChevronDown className="ml-2" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Button
							variant="ghost"
							className="justify-start"
							asChild
						>
							<Link href={route("profile.edit")}>
								<UserCog className="mr-2 h-4 w-4" />

								<span>Perfil</span>
							</Link>
						</Button>
					</DropdownMenuItem>

					<DropdownMenuItem asChild>
						<Button
							variant="ghost"
							className="justify-start"
							asChild
						>
							<Link
								href={route("logout")}
								as="button"
								type="button"
								method="post"
							>
								<LogOut className="mr-2 h-4 w-4" />

								<span>Cerrar Sesión</span>
							</Link>
						</Button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
