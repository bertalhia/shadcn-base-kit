"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

/**
 * A password field with a reveal toggle.
 *
 * Masked characters with no way to check them is where typos hide, and it is
 * why people paste passwords into a text field to read them back.
 *
 * The toggle is `type="button"` so it never submits the form around it, and the
 * visible state is local — a revealed password has no business being persisted.
 */
export function PasswordInput({
  showLabel = "Show password",
  hideLabel = "Hide password",
  className,
  ...props
}: Omit<React.ComponentProps<typeof InputGroupInput>, "type"> & {
  showLabel?: string;
  hideLabel?: string;
}) {
  const [visible, setVisible] = React.useState(false);

  return (
    <InputGroup className={className}>
      <InputGroupInput type={visible ? "text" : "password"} {...props} />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label={visible ? hideLabel : showLabel}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
