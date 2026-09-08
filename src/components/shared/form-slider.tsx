"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { Slider } from "@/components/ui/slider";

/**
 * A number picked from a range.
 *
 * A slider gives no feedback about the value it holds, so pair it with a
 * description that shows the current number.
 */
export function FormSlider<
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
    React.ComponentProps<typeof Slider>,
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
      {({ field, id }) => (
        <Slider
          id={id}
          value={field.value}
          onValueChange={field.onChange}
          onBlur={field.onBlur}
          {...props}
        />
      )}
    </FormField>
  );
}
