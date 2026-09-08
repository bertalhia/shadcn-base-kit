"use client";

import type { FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { BaseFieldProps } from "@/components/shared/form-field";
import type { ChoiceOption } from "@/components/shared/form-radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

/**
 * Any number of a set, stored as an array of values.
 *
 * `data-slot="checkbox-group"` on the group is what the Field docs ask for —
 * it is the hook the stylesheet uses for the tighter spacing checkboxes want.
 */
export function FormCheckboxGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
  options,
}: BaseFieldProps<TFieldValues, TName> & { options: ChoiceOption[] }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selected: string[] = Array.isArray(field.value)
          ? field.value
          : [];

        const toggle = (value: string, checked: boolean) => {
          field.onChange(
            checked
              ? [...selected, value]
              : selected.filter((item) => item !== value),
          );
        };

        return (
          <FieldSet
            className={className}
            data-invalid={fieldState.invalid || undefined}
          >
            {label ? <FieldLegend variant="label">{label}</FieldLegend> : null}
            {description ? (
              <FieldDescription>{description}</FieldDescription>
            ) : null}
            <FieldGroup data-slot="checkbox-group">
              {options.map((option) => {
                const id = `${field.name}-${option.value}`;
                return (
                  <Field key={option.value} orientation="horizontal">
                    <Checkbox
                      id={id}
                      checked={selected.includes(option.value)}
                      disabled={option.disabled}
                      onCheckedChange={(checked) =>
                        toggle(option.value, checked === true)
                      }
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={id}>
                        <FieldTitle>{option.label}</FieldTitle>
                      </FieldLabel>
                      {option.description ? (
                        <FieldDescription>
                          {option.description}
                        </FieldDescription>
                      ) : null}
                    </FieldContent>
                  </Field>
                );
              })}
            </FieldGroup>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </FieldSet>
        );
      }}
    />
  );
}
