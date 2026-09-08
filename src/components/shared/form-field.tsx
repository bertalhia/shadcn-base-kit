"use client";

import type * as React from "react";
import {
  type Control,
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

/**
 * Every field in this project renders through here.
 *
 * It owns the four things the shadcn Field docs ask for and that are easy to
 * get subtly wrong per field: `data-invalid` on the wrapper, `htmlFor` tied to
 * the control id, the description, and `FieldError` fed from React Hook Form.
 * A field component only has to render its control.
 */

export type FieldRenderArgs<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  /** Matches the label's `htmlFor`. Put it on the control. */
  id: string;
  /** Pass straight to the control so assistive tech hears the error. */
  invalid: boolean;
};

export type BaseFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label?: React.ReactNode;
  /**
   * Only worth a line if it says something the label cannot. A rule the person
   * could not guess earns its place; restating the label does not.
   */
  description?: React.ReactNode;
  orientation?: React.ComponentProps<typeof Field>["orientation"];
  className?: string;
};

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  orientation = "vertical",
  className,
  children,
}: BaseFieldProps<TFieldValues, TName> & {
  children: (args: FieldRenderArgs<TFieldValues, TName>) => React.ReactNode;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const invalid = fieldState.invalid;
        const control = children({
          field,
          fieldState,
          id: field.name,
          invalid,
        });

        return (
          <Field
            orientation={orientation}
            className={className}
            data-invalid={invalid || undefined}
          >
            {orientation === "horizontal" ? (
              <>
                <FieldContent>
                  {label ? (
                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                  ) : null}
                  {description ? (
                    <FieldDescription>{description}</FieldDescription>
                  ) : null}
                  {invalid ? <FieldError errors={[fieldState.error]} /> : null}
                </FieldContent>
                {control}
              </>
            ) : (
              <>
                {label ? (
                  <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                ) : null}
                {control}
                {description ? (
                  <FieldDescription>{description}</FieldDescription>
                ) : null}
                {invalid ? <FieldError errors={[fieldState.error]} /> : null}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}
