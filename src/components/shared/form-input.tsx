"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";

/** Single-line text. The default field, and the one most forms are made of. */
export function FormInput<
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
  Omit<React.ComponentProps<typeof Input>, "name" | "form">) {
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
        <Input
          {...field}
          id={id}
          value={field.value ?? ""}
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FormField>
  );
}
