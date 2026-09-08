"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { applyMask, isPlaceholder, stripMask } from "@/utils/mask";

/** A digits-only mask deserves the numeric keypad; one taking letters does not. */
function inputModeFor(
  pattern: string,
): React.HTMLAttributes<HTMLInputElement>["inputMode"] {
  const slots = [...pattern].filter(isPlaceholder);
  return slots.every((slot) => slot === "#") ? "numeric" : "text";
}

/**
 * A text input that formats as you type against a pattern.
 *
 * The mask is presentation: `onValueChange` hands back both the formatted
 * string and the raw characters, so a caller stores whichever it needs instead
 * of unmasking by hand.
 */
export function MaskedInput({
  pattern,
  value,
  onValueChange,
  onChange,
  ...props
}: Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> & {
  pattern: string;
  value: string;
  onValueChange: (formatted: string, raw: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = applyMask(event.target.value, pattern);
      onValueChange(formatted, stripMask(formatted, pattern));
      onChange?.(event);
    },
    [pattern, onValueChange, onChange],
  );

  return (
    <Input
      inputMode={inputModeFor(pattern)}
      autoComplete="off"
      value={applyMask(value, pattern)}
      onChange={handleChange}
      maxLength={pattern.length}
      {...props}
    />
  );
}
