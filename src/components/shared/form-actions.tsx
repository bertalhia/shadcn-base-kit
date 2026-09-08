"use client";

import { cn } from "cn";

import { Field } from "@/components/ui/field";

/**
 * The row a form ends on.
 *
 * The primary action sits first in the DOM so it is the first thing reached by
 * keyboard and by a screen reader; `flex-row-reverse` puts it on the right for
 * everyone else.
 */
export function FormActions({
  className,
  ...props
}: React.ComponentProps<typeof Field>) {
  return (
    <Field
      orientation="horizontal"
      className={cn("flex-row-reverse justify-start pt-2", className)}
      {...props}
    />
  );
}
