import { cnpj, cpf } from "cpf-cnpj-validator";

import { applyMask, applyVariablePattern, stripMask } from "./mask";

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

/** Widens from CPF to CNPJ as the value grows past eleven characters. */
export function formatDocument(value: string) {
  return applyVariablePattern(stripDocument(value), [
    CPF_PATTERN,
    CNPJ_PATTERN,
  ]);
}

export function documentKind(value: string): DocumentKind {
  return stripDocument(value).length > 11 ? "cnpj" : "cpf";
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
