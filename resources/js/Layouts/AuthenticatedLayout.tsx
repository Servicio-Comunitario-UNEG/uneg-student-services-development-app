import BaseLayout from "./BaseLayout";
import NavBar from "./Partials/NavBar";
import SideBar from "./Partials/SideBar";

export function AuthenticatedLayout({
	children,
}: {
	children: React.JSX.Element;
}) {
	return (
		<BaseLayout>
			<div className="relative mx-auto flex min-h-screen w-full max-w-screen-2xl">
				<div className="hidden lg:block lg:w-full lg:max-w-xs">
					<SideBar />
				</div>

				<div className="relative max-h-screen flex-1 overflow-auto">
					<NavBar className="lg:hidden" />

					<div className="p-6">{children}</div>
				</div>
			</div>
		</BaseLayout>
	);
}
