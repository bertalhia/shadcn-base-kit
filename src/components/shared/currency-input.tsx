"use client";

import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  currencyInputToCents,
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
} from "@/utils/number";

/** The currency's symbol on its own, for the addon. */
function currencySymbol(locale: string, currency: string) {
  return (
    new Intl.NumberFormat(locale, { style: "currency", currency })
      .formatToParts(0)
      .find((part) => part.type === "currency")?.value ?? currency
  );
}

/**
 * Money input that works in cents.
 *
 * Every keystroke shifts the value one decimal place — type `1`, `2`, `5` and
 * you get 1.25 — so there is never a half-written number to parse, and no way
 * to land on a float that cannot represent the amount.
 */
export function CurrencyInput({
  value,
  onValueChange,
  locale = DEFAULT_LOCALE,
  currency = DEFAULT_CURRENCY,
  className,
  onChange,
  ...props
}: Omit<React.ComponentProps<typeof InputGroupInput>, "value" | "onChange"> & {
  /** Amount in cents. */
  value: number;
  onValueChange: (cents: number) => void;
  locale?: string;
  currency?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange(currencyInputToCents(event.target.value));
      onChange?.(event);
    },
    [onValueChange, onChange],
  );

  // The addon already carries the symbol, so the field shows the number alone.
  const display = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);

  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <InputGroupText>{currencySymbol(locale, currency)}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        inputMode="numeric"
        autoComplete="off"
        value={display}
        onChange={handleChange}
        {...props}
      />
    </InputGroup>
  );
}
