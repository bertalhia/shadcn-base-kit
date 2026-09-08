import { cnpj, cpf } from "cpf-cnpj-validator";

import { applyMask, stripMask } from "@/utils/mask";

export const CPF_PATTERN = "###.###.###-##";
/**
 * CNPJ takes letters in the first twelve positions since RFB technical note
 * 49/2024; only the two check digits stay numeric. `*` accepts both, which
 * covers the legacy all-numeric format and the alphanumeric one.
 */
export const CNPJ_PATTERN = "**.***.***/****-##";

export type DocumentKind = "cpf" | "cnpj";

/** Uppercase, and nothing but the characters a document can hold. */
export function stripDocument(value: string) {
  return value.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

export function formatCpf(value: string) {
  return applyMask(value.replace(/\D/g, ""), CPF_PATTERN);
}

export function formatCnpj(value: string) {
  return applyMask(stripDocument(value), CNPJ_PATTERN);
}

/**
 * A CPF is eleven digits; a CNPJ is fourteen characters and may contain
 * letters. So a letter settles it on its own — waiting for the twelfth
 * character would mean masking `12ABC…` as a CPF and dropping the letters,
 * which is what a length-only rule does.
 */
export function documentKind(value: string): DocumentKind {
  const raw = stripDocument(value);
  if (/[A-Z]/.test(raw)) return "cnpj";
  return raw.length > 11 ? "cnpj" : "cpf";
}

/** Widens from CPF to CNPJ as soon as the value can only be a CNPJ. */
export function formatDocument(value: string) {
  const raw = stripDocument(value);
  return documentKind(raw) === "cnpj"
    ? applyMask(raw, CNPJ_PATTERN)
    : applyMask(raw, CPF_PATTERN);
}

export function isValidCpf(value: string) {
  return cpf.isValid(value);
}

export function isValidCnpj(value: string) {
  return cnpj.isValid(value);
}

/** Accepts either, picking the algorithm by length. */
export function isValidDocument(value: string) {
  return documentKind(value) === "cpf" ? isValidCpf(value) : isValidCnpj(value);
}

/** Formats a stored value for display, whichever kind it turns out to be. */
export function displayDocument(value: string) {
  return documentKind(value) === "cpf" ? formatCpf(value) : formatCnpj(value);
}

export function stripCpf(value: string) {
  return stripMask(value, CPF_PATTERN);
}

export function stripCnpj(value: string) {
  return stripDocument(value);
}
