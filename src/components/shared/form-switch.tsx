"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { BaseFieldProps } from "@/components/shared/form-field";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";

/**
 * A setting that takes effect as it is flipped.
 *
 * Use a switch for state, a checkbox for a choice being collected — a switch
 * that only takes effect on submit reads as a lie.
 */
export function FormSwitch<
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
          <Switch
            id={field.name}
            name={field.name}
            checked={Boolean(field.value)}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}
