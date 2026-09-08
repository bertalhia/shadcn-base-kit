"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { CurrencyInput } from "@/components/shared/currency-input";
import { type BaseFieldProps, FormField } from "@/components/shared/form-field";

/** An amount, held in cents for the whole round trip. */
export function FormCurrencyInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  orientation,
  className,
  ...props
}: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof CurrencyInput>,
    "value" | "onValueChange" | "name"
  >) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      orientation={orientation}
      className={className}
    >
      {({ field, id, invalid }) => (
        <CurrencyInput
          id={id}
          name={field.name}
          ref={field.ref}
          value={Number(field.value ?? 0)}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FormField>
  );
}
