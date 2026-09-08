"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { DocumentInput } from "@/components/shared/document-input";
import { type BaseFieldProps, FormField } from "@/components/shared/form-field";

/**
 * CPF or CNPJ, masked as it is typed and checked by `documentSchema`.
 *
 * The field keeps the formatted string so the mask survives a re-render; the
 * schema strips it before the value leaves the form.
 */
export function FormDocumentInput<
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
    React.ComponentProps<typeof DocumentInput>,
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
        <DocumentInput
          id={id}
          name={field.name}
          ref={field.ref}
          value={field.value ?? ""}
          onValueChange={(formatted) => field.onChange(formatted)}
          onBlur={field.onBlur}
          aria-invalid={invalid}
          {...props}
        />
      )}
    </FormField>
  );
}
