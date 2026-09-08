"use client";

import type { Control, FieldValues } from "react-hook-form";
import { useFormState } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

/**
 * The button that sends a form.
 *
 * It reads submission state from the form itself, so no screen has to thread an
 * `isLoading` prop down to it, and it disables while in flight — the one guard
 * that actually prevents a double submit.
 *
 * `useFormState` subscribes to just this slice, so a keystroke in some field
 * does not re-render the button.
 */
export function SubmitButton<TFieldValues extends FieldValues>({
  control,
  children = "Save",
  pendingLabel,
  disabled,
  ...props
}: React.ComponentProps<typeof Button> & {
  control: Control<TFieldValues>;
  /** Shown while submitting. Defaults to the idle label. */
  pendingLabel?: React.ReactNode;
}) {
  const { isSubmitting } = useFormState({ control });

  return (
    <Button type="submit" disabled={disabled || isSubmitting} {...props}>
      {isSubmitting ? <Spinner /> : null}
      {isSubmitting ? (pendingLabel ?? children) : children}
    </Button>
  );
}
