import { usePage } from "@inertiajs/react";

import { PageProps } from "@/types";

export function useGate() {
	const { permission_names } = usePage<PageProps>().props.auth.user;

	return {
		allows: (permission: string) => {
			return permission_names.includes(permission);
		},
		any: (permissions: string[]) => {
			return permission_names.some((permissionName) =>
				permissions.includes(permissionName),
			);
		},
	};
}
