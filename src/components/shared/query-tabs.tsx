"use client";

import { parseAsStringLiteral, useQueryState } from "nuqs";
import type * as React from "react";

import { Tabs } from "@/components/ui/tabs";

/**
 * Tabs whose active panel lives in the URL.
 *
 * Which tab is open is exactly the state the nuqs rule is about: a reload
 * should land where you were, and a link into a filtered table is useless if
 * it opens on a different tab. Nested tabs get their own `queryKey`, so an
 * outer and an inner strip do not fight.
 *
 * `parseAsStringLiteral` keeps a hand-edited URL from selecting a panel that
 * does not exist — anything unrecognised falls back to the default.
 *
 * The page rendering this needs a `<Suspense>` boundary, since `useQueryState`
 * reads `useSearchParams()` underneath.
 */
export function QueryTabs({
  queryKey,
  values,
  defaultValue,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Tabs>, "value" | "onValueChange"> & {
  queryKey: string;
  values: string[];
  defaultValue?: string;
}) {
  const [tab, setTab] = useQueryState(
    queryKey,
    parseAsStringLiteral(values).withDefault(defaultValue ?? values[0]),
  );

  return (
    <Tabs value={tab} onValueChange={(value) => setTab(value)} {...props}>
      {children}
    </Tabs>
  );
}
