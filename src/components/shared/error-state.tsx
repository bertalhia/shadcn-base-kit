import { TriangleAlertIcon } from "lucide-react";
import type * as React from "react";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

/**
 * A failure a person can act on.
 *
 * Say what did not happen and what to do next. A raw status code tells them
 * nothing, so keep `detail` for the part they could repeat to support.
 */
export function ErrorState({
  title = "That did not go through",
  description,
  detail,
  action,
  className,
}: {
  title?: React.ReactNode;
  description: React.ReactNode;
  /** Reference or code, shown small — useful to quote, not to read. */
  detail?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Alert variant="destructive" className={className}>
      <TriangleAlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
        {detail ? (
          <span className="mt-1 block font-mono text-xs opacity-80">
            {detail}
          </span>
        ) : null}
      </AlertDescription>
      {action ? <AlertAction>{action}</AlertAction> : null}
    </Alert>
  );
}
