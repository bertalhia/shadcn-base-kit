"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";

/** A password, wired to the form. Rules belong in `passwordSchema`. */
export function FormPasswordInput<
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
  Omit<React.ComponentProps<typeof PasswordInput>, "value" | "name">) {
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
        <PasswordInput
          {...field}
          id={id}
          value={field.value ?? ""}
          autoComplete="current-password"
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FormField>
  );
}
