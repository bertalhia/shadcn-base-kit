"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  type DocumentKind,
  documentKind,
  formatCnpj,
  formatCpf,
  formatDocument,
  stripDocument,
} from "@/lib/document";

/**
 * CPF or CNPJ in one field.
 *
 * With `kind="auto"` the mask widens from CPF to CNPJ once the value passes
 * eleven characters, so a form accepting either does not make the person choose
 * first. CNPJ takes letters in its first twelve positions under RFB technical
 * note 49/2024, which is why this cannot be a digits-only mask.
 */
/**
 * A shaped example rather than the raw mask. `###.###.###-##` shows the
 * grouping but reads as debug output; a number shows the same thing and looks
 * like something you could have typed.
 */
const EXAMPLE: Record<DocumentKind, string> = {
  cpf: "000.000.000-00",
  cnpj: "00.000.000/0000-00",
};

const MAX_LENGTH: Record<DocumentKind, number> = {
  cpf: EXAMPLE.cpf.length,
  cnpj: EXAMPLE.cnpj.length,
};

export function DocumentInput({
  value,
  onValueChange,
  kind = "auto",
  placeholder,
  onChange,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  value: string;
  onValueChange: (formatted: string, raw: string) => void;
  kind?: DocumentKind | "auto";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const format =
    kind === "cpf" ? formatCpf : kind === "cnpj" ? formatCnpj : formatDocument;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = format(event.target.value);
      onValueChange(formatted, stripDocument(formatted));
      onChange?.(event);
    },
    [format, onValueChange, onChange],
  );

  const activeKind = kind === "auto" ? documentKind(value) : kind;

  return (
    <Input
      inputMode={activeKind === "cpf" ? "numeric" : "text"}
      autoComplete="off"
      value={value}
      onChange={handleChange}
      maxLength={MAX_LENGTH[kind === "cpf" ? "cpf" : "cnpj"]}
      placeholder={placeholder ?? EXAMPLE[activeKind]}
      {...props}
    />
  );
}
