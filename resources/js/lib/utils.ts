import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Student } from "@/types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getFullName({
	first_name,
	second_name,
	last_name,
	second_last_name,
}: Student) {
	return [first_name, second_name, last_name, second_last_name].reduce(
		(previous, current) => {
			if (!previous) return current ?? "";

			if (!current) return previous;

			return previous.concat(` ${current}`);
		},
		"",
	);
}

/**
 * Wether the link is active.
 */
export function isActiveLink({
	url,
	to,
	urlStartsWith,
}: {
	url: string;
	to: string;
	urlStartsWith?: string;
}) {
	if (!urlStartsWith) return route().current(to);

	// Get the the tag, e.g. /tags/create, it will get the tags string.
	const [, parentTag = ""] = url.split("/");

	// As the urlStartsWith starts with /, then ignore them and take the rest.
	return parentTag === urlStartsWith.substring(1);
}
