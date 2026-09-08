import * as z from "zod";

import { isValidDocument, stripDocument } from "@/lib/document";
import { isValidPhone, toE164 } from "@/lib/phone";

/**
 * Zod schemas that already know how our masked inputs store their values, so a
 * form never re-states the same rule. Each one strips the mask before checking,
 * and transforms to the shape an API should receive.
 */

export const phoneSchema = z
  .string()
  .min(1, "Enter a phone number.")
  .refine((value) => isValidPhone(value), "That phone number is not valid.")
  .transform((value) => toE164(value) ?? value);

export const optionalPhoneSchema = z
  .string()
  .transform((value) => value.trim())
  .refine(
    (value) => value === "" || isValidPhone(value),
    "That phone number is not valid.",
  )
  .transform((value) => (value === "" ? undefined : (toE164(value) ?? value)));

export const documentSchema = z
  .string()
  .min(1, "Enter a CPF or CNPJ.")
  .refine(isValidDocument, "Check the digits — that document is not valid.")
  .transform(stripDocument);

export const cepSchema = z
  .string()
  .transform((value) => value.replace(/\D/g, ""))
  .refine((value) => value.length === 8, "A postal code has 8 digits.");

export const emailSchema = z
  .string()
  .min(1, "Enter an email address.")
  .email("That email address is not valid.")
  .transform((value) => value.trim().toLowerCase());

/**
 * Rules a person cannot guess belong in the message; the length one earns its
 * place because the form would otherwise reject a submission with no warning.
 */
export const passwordSchema = z
  .string()
  .min(8, "Use at least 8 characters.")
  .regex(/[a-z]/, "Include a lowercase letter.")
  .regex(/[A-Z]/, "Include an uppercase letter.")
  .regex(/\d/, "Include a number.");

export const currencySchema = z
  .number()
  .int("Amounts are stored in cents.")
  .nonnegative("An amount cannot be negative.");

/** Confirms a second field matches the first, e.g. a repeated password. */
export function matches<T extends z.ZodTypeAny>(
  schema: T,
  field: string,
  message: string,
) {
  return schema.superRefine((value, ctx) => {
    const record = value as Record<string, unknown>;
    if (record[field] !== record[`${field}Confirmation`]) {
      ctx.addIssue({
        code: "custom",
        message,
        path: [`${field}Confirmation`],
      });
    }
  });
}
