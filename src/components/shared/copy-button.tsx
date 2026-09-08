"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Copies a value and says so.
 *
 * The confirmation is the point — without it people click twice, unsure it
 * worked. The icon returns to its resting state after two seconds.
 */
export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "onClick" | "value"> & {
  value: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={copied ? copiedLabel : label}
            onClick={() => {
              void navigator.clipboard.writeText(value);
              setCopied(true);
            }}
            {...props}
          />
        }
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </TooltipTrigger>
      <TooltipContent>{copied ? copiedLabel : label}</TooltipContent>
    </Tooltip>
  );
}
