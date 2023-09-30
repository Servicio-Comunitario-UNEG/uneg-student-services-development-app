import { ComponentPropsWithoutRef } from "react";

export default function ApplicationLogo(
	props: Omit<ComponentPropsWithoutRef<"img">, "src">,
) {
	return (
		<img
			src="/images/uneg-blue-logo.png"
			alt="Logo de la UNEG"
			{...props}
		/>
	);
}
