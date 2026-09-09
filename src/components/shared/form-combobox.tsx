"use client";

import type { FieldPath, FieldValues } from "react-hook-form";

import { type BaseFieldProps, FormField } from "@/components/shared/form-field";
import type { SelectOption } from "@/components/shared/form-select";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";

/**
 * A long list you search rather than scroll.
 *
 * Past a couple of dozen options a Select turns into a scavenger hunt; this
 * filters as you type. `items` feeds the primitive's own filtering, so the list
 * is not re-implemented here.
 */
export function FormCombobox<
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
  placeholder = "Search",
  emptyMessage = "Nothing matches that.",
}: BaseFieldProps<TFieldValues, TName> & {
  options: SelectOption[];
  placeholder?: string;
  emptyMessage?: string;
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
      {({ field, id, invalid }) => {
        const selected = options.find((option) => option.value === field.value);

        return (
          <Combobox
            items={options}
            value={
              options.find((option) => option.value === field.value) ?? null
            }
            onValueChange={(option: SelectOption | null) =>
              field.onChange(option?.value ?? "")
            }
            itemToStringValue={(option: SelectOption) => option.label}
          >
            <ComboboxInput
              id={id}
              placeholder={placeholder}
              aria-invalid={invalid}
              onBlur={field.onBlur}
            >
              {/* `align="inline-start"` is `order-first`, so this lands before
                the input however the children are ordered. */}
              {selected?.icon ? (
                <InputGroupAddon align="inline-start">
                  {selected.icon}
                </InputGroupAddon>
              ) : null}
            </ComboboxInput>
            <ComboboxContent>
              <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
              <ComboboxList>
                {(option: SelectOption) => (
                  <ComboboxItem key={option.value} value={option}>
                    {option.icon}
                    {option.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        );
      }}
    </FormField>
  );
}
