"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import type { SelectOption } from "@/components/shared/form-select";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

/**
 * The platform's own select.
 *
 * Worth reaching for on long lists and on mobile, where the OS picker beats a
 * custom popup — and it submits with the form even without JavaScript.
 */
export function FormNativeSelect<
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
}: BaseFieldProps<TFieldValues, TName> & {
  options: SelectOption[];
  placeholder?: string;
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
        <NativeSelect
          {...field}
          id={id}
          value={field.value ?? ""}
          aria-invalid={invalid}
        >
          <NativeSelectOption value="" disabled>
            {placeholder}
          </NativeSelectOption>
          {options.map((option) => (
            <NativeSelectOption
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      )}
    </FormField>
  );
}
