"use client";

import type * as React from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
  /**
   * A flag, an avatar, a status dot. Carried on the option rather than passed
   * as a render function so it shows up in the list *and* on the selected
   * value, in every field that takes options, without each call site
   * remembering to do both.
   */
  icon?: React.ReactNode;
};

/**
 * A closed list of options.
 *
 * Base UI drives Select through `value`/`onValueChange`, so the field is wired
 * by hand rather than spread — and `aria-invalid` belongs on the trigger, which
 * is the element a person actually focuses.
 */
export function FormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  orientation,
  className,
  options,
  placeholder = "Select an option",
  triggerClassName,
}: BaseFieldProps<TFieldValues, TName> & {
  options: SelectOption[];
  placeholder?: string;
  triggerClassName?: string;
}) {
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
        <Select value={field.value ?? ""} onValueChange={field.onChange}>
          <SelectTrigger
            id={id}
            className={triggerClassName}
            aria-invalid={invalid}
            onBlur={field.onBlur}
          >
            {options.find((option) => option.value === field.value)?.icon}
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.icon}
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </FormField>
  );
}
