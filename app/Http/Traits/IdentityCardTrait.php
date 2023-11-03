<?php
namespace App\Http\Traits;

trait IdentityCardTrait {
	/**
	 * Returns the identity card from the nationality and serial.
	 */
	function toIdentityCardString(array $identity_card): string {
		$nationality =
			key_exists("nationality", $identity_card) &&
			is_string($identity_card["nationality"])
				? $identity_card["nationality"]
				: "";

		$serial =
			key_exists("serial", $identity_card) &&
			is_string($identity_card["serial"])
				? $identity_card["serial"]
				: "";

		return $nationality . $serial;
	}
}
