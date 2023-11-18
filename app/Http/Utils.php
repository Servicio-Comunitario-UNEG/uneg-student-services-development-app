<?php

namespace App\Http;

class Utils {
	/**
	 * Returns the identity card from the nationality and serial.
	 */
	public static function toIdentityCardString(array $identityCard): string {
		$nationality =
			key_exists("nationality", $identityCard) &&
			is_string($identityCard["nationality"])
				? $identityCard["nationality"]
				: "";

		$serial =
			key_exists("serial", $identityCard) &&
			is_string($identityCard["serial"])
				? $identityCard["serial"]
				: "";

		return $nationality . $serial;
	}

	/**
	 * Returns a date string which represent the maximum birth date
	 * an student can have to be enrollable in the university.
	 *
	 * Currently, set to 17 yo.
	 */
	public static function getMaximumEnrollableBirthDate(): string {
		return (new \DateTime("now - 17 year"))->format("Y-m-d");
	}
}
