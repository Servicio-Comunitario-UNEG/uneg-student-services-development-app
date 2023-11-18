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
