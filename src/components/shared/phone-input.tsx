"use client";

import type { CountryCode } from "libphonenumber-js";
import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  DEFAULT_COUNTRY,
  formatPhone,
  phoneMaxLength,
  phonePlaceholder,
  stripPhone,
} from "@/lib/format/phone";

/**
 * Phone input driven by libphonenumber-js rather than a pattern.
 *
 * Numbering plans differ per country and change over time; `AsYouType` already
 * knows them, so there is no mask here to fall behind.
 */
export function PhoneInput({
  value,
  onValueChange,
  country = DEFAULT_COUNTRY,
  placeholder,
  onChange,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  value: string;
  onValueChange: (formatted: string, raw: string) => void;
  country?: CountryCode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const typed = event.target.value;
      // Formatting a shrinking value would re-add the separator the person just
      // deleted, trapping the caret. Reformat only when the value grows.
      const formatted =
        typed.length < value.length ? typed : formatPhone(typed, country);
      onValueChange(formatted, stripPhone(formatted));
      onChange?.(event);
    },
    [country, value.length, onValueChange, onChange],
  );

  return (
    <Input
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder ?? phonePlaceholder(country)}
      maxLength={phoneMaxLength(country)}
      {...props}
    />
  );
}
