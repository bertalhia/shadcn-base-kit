"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import type { SelectOption } from "@/components/shared/form-select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/**
 * A handful of options, all on screen, chosen by pressing one.
 *
 * Good up to about five short labels. Beyond that the row wraps and a Select
 * reads better.
 */
export function FormToggleGroup<
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
  ...props
}: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof ToggleGroup>,
    "value" | "onValueChange" | "children" | "name" | "type"
  > & { options: SelectOption[] }) {
  return (
    <FormField
      control={control}
      name={name}
      label={label}
      description={description}
      orientation={orientation}
      className={className}
    >
      {({ field, id }) => (
        <ToggleGroup
          id={id}
          value={field.value ? [field.value] : []}
          onValueChange={(value: string[]) => field.onChange(value[0] ?? "")}
          {...props}
        >
          {options.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      )}
    </FormField>
  );
}
