"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import type * as React from "react";
import {
  type DefaultValues,
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import type { z } from "zod";

import { FieldGroup } from "@/components/ui/field";

/**
 * The one way a form is set up here: a Zod schema in, a typed form out.
 *
 * Wrapping `useForm` keeps the resolver, the inferred types and the validation
 * mode in one place, so no form re-decides them.
 */
export function useZodForm<TInput extends FieldValues, TOutput>(
  schema: z.ZodType<TOutput, TInput>,
  options?: Omit<UseFormProps<TInput, undefined, TOutput>, "resolver"> & {
    defaultValues?: DefaultValues<TInput>;
  },
) {
  return useForm<TInput, undefined, TOutput>({
    resolver: zodResolver(schema),
    ...options,
  });
}

/** The form `useZodForm` returns for a given schema. */
export type ZodForm<TSchema extends z.ZodType<unknown, FieldValues>> =
  UseFormReturn<z.input<TSchema>, undefined, z.output<TSchema>>;

/**
 * Wires the form element to React Hook Form and puts the context in place, so
 * fields deeper in the tree reach the form without prop drilling.
 */
export function Form<TInput extends FieldValues, TOutput>({
  form,
  onSubmit,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  form: UseFormReturn<TInput, undefined, TOutput>;
  onSubmit: SubmitHandler<TOutput>;
}) {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

/** Groups fields with the spacing the design system expects. */
export function FormSection(props: React.ComponentProps<typeof FieldGroup>) {
  return <FieldGroup {...props} />;
}
