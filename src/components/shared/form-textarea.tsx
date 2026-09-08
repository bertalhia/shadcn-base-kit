"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import { Textarea } from "@/components/ui/textarea";

/** Multi-line text, for anything a person writes in sentences. */
export function FormTextarea<
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
  Omit<React.ComponentProps<typeof Textarea>, "name" | "form">) {
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
        <Textarea
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
