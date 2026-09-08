"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { BaseFieldProps } from "@/components/shared/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";

/**
 * A single boolean.
 *
 * Laid out horizontally with the control first, which is what the Field docs
 * prescribe for checkboxes and switches — the label reads as the thing being
 * turned on, not as a heading above it.
 */
export function FormCheckbox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
}: BaseFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          className={className}
          data-invalid={fieldState.invalid || undefined}
        >
          <Checkbox
            id={field.name}
            name={field.name}
            checked={Boolean(field.value)}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            aria-invalid={fieldState.invalid}
          />
          <FieldContent>
            <FieldLabel htmlFor={field.name}>
              <FieldTitle>{label}</FieldTitle>
            </FieldLabel>
            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </FieldContent>
        </Field>
      )}
    />
  );
}
