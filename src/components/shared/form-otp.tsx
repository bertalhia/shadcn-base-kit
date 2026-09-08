"use client";

import * as React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

/**
 * A one-time code.
 *
 * `groups` splits the slots visually — `[3, 3]` renders two blocks of three
 * with a separator, which is how most codes arrive in a message.
 */
export function FormOtp<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
  length = 6,
  groups,
  ...props
}: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof InputOTP>,
    "value" | "onChange" | "maxLength" | "children" | "render" | "name"
  > & {
    length?: number;
    groups?: number[];
  }) {
  const blocks = groups ?? [length];

  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      className={className}
    >
      {({ field, id }) => (
        <InputOTP
          id={id}
          maxLength={length}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...props}
        >
          {blocks.map((size, blockIndex) => {
            const offset = blocks
              .slice(0, blockIndex)
              .reduce((total, count) => total + count, 0);
            return (
              <React.Fragment key={offset}>
                {blockIndex > 0 ? <InputOTPSeparator /> : null}
                <InputOTPGroup>
                  {Array.from({ length: size }, (_, slot) => (
                    <InputOTPSlot key={offset + slot} index={offset + slot} />
                  ))}
                </InputOTPGroup>
              </React.Fragment>
            );
          })}
        </InputOTP>
      )}
    </FormField>
  );
}
