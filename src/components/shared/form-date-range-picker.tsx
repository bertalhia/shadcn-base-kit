"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { DateRangePicker } from "@/components/ui/date-picker";

/** A start and an end date, held as one `DateRange` value. */
export function FormDateRangePicker<
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
    React.ComponentProps<typeof DateRangePicker>,
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
        <DateRangePicker
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
