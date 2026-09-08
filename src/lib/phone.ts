import {
  AsYouType,
  type CountryCode,
  getExampleNumber,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";

export const DEFAULT_COUNTRY: CountryCode = "BR";

/**
 * Formats while typing. `AsYouType` keeps partial input readable and adds
 * separators only once the digits justify them, so no pattern to maintain per
 * country.
 */
export function formatPhone(value: string, country = DEFAULT_COUNTRY) {
  return new AsYouType(country).input(value);
}

/** Digits only, plus a leading `+` when the caller typed an international number. */
export function stripPhone(value: string) {
  const digits = value.replace(/[^\d+]/g, "");
  return digits.startsWith("+")
    ? `+${digits.slice(1).replace(/\+/g, "")}`
    : digits;
}

/** E.164 (`+5511987654321`), the shape to store and to send to an API. */
export function toE164(value: string, country = DEFAULT_COUNTRY) {
  return parsePhoneNumberFromString(value, country)?.number;
}

/** National formatting (`(11) 98765-4321`), the shape to show back. */
export function formatPhoneNational(value: string, country = DEFAULT_COUNTRY) {
  return parsePhoneNumberFromString(value, country)?.formatNational() ?? value;
}

export function isValidPhone(value: string, country = DEFAULT_COUNTRY) {
  if (!value) return false;
  return isValidPhoneNumber(value, country);
}

/** A real number for the country, to use as a placeholder. */
export function phonePlaceholder(country = DEFAULT_COUNTRY) {
  return getExampleNumber(country, examples)?.formatNational() ?? "";
}

/** Widest a formatted number gets, so the input can cap its length. */
export function phoneMaxLength(country = DEFAULT_COUNTRY) {
  return Math.max(phonePlaceholder(country).length + 2, 20);
}
