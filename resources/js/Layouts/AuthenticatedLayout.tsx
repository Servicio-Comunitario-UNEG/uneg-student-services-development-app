import NavBar from "./Partials/NavBar";

export function AuthenticatedLayout({ children }: { children: JSX.Element }) {
	return (
		<div className="min-h-screen">
			<NavBar />

			<div className="p-6 sm:container">{children}</div>
		</div>
	);
}
