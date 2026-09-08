"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { DatePicker } from "@/components/ui/date-picker";

/**
 * A single date.
 *
 * No `queryKey` here on purpose: inside a form React Hook Form owns the value,
 * and a draft has no business in the URL.
 */
export function FormDatePicker<
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
    React.ComponentProps<typeof DatePicker>,
    "value" | "onValueChange" | "queryKey" | "name"
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
        <DatePicker
          id={id}
          value={field.value ?? undefined}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FormField>
  );
}
