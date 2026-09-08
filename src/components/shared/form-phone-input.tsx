"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { PhoneInput } from "@/components/shared/phone-input";

/**
 * Phone number, formatted for the country as it is typed.
 *
 * The field stores what the person sees; `phoneSchema` converts it to E.164 on
 * submit, so the form value and the API payload never drift apart.
 */
export function FormPhoneInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  orientation,
  className,
  country,
  ...props
}: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof PhoneInput>,
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
        <PhoneInput
          id={id}
          name={field.name}
          ref={field.ref}
          value={field.value ?? ""}
          onValueChange={(formatted) => field.onChange(formatted)}
          onBlur={field.onBlur}
          country={country}
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FormField>
  );
}
