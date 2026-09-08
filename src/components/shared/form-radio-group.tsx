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
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type ChoiceOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

/**
 * One of several, all visible at once.
 *
 * Each option is the selectable card from the Field docs: the whole row is the
 * label, so the hit target is the card and not just the dot.
 */
export function FormRadioGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
  options,
}: BaseFieldProps<TFieldValues, TName> & {
  options: ChoiceOption[];
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet
          className={className}
          data-invalid={fieldState.invalid || undefined}
        >
          {label ? <FieldLegend variant="label">{label}</FieldLegend> : null}
          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
          <RadioGroup
            name={field.name}
            value={field.value ?? ""}
            onValueChange={field.onChange}
          >
            {options.map((option) => {
              const id = `${field.name}-${option.value}`;
              return (
                <FieldLabel key={option.value} htmlFor={id}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{option.label}</FieldTitle>
                      {option.description ? (
                        <FieldDescription>
                          {option.description}
                        </FieldDescription>
                      ) : null}
                    </FieldContent>
                    <RadioGroupItem
                      id={id}
                      value={option.value}
                      disabled={option.disabled}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </FieldSet>
      )}
    />
  );
}
