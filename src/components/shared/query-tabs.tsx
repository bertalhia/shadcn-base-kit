"use client";

import { cn } from "cn";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";
import type * as React from "react";
import { Tabs, TabsList } from "@/components/ui/tabs";

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
  ownedKeys,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Tabs>, "value" | "onValueChange"> & {
  queryKey: string;
  values: string[];
  defaultValue?: string;
  /**
   * Which query keys belong to which tab, so leaving a tab takes its params
   * with it. Without this a nested strip's key outlives its parent and
   * `?settings=preferences` trails into a tab that has no idea what it means.
   */
  ownedKeys?: Record<string, string[]>;
}) {
  const owned = ownedKeys ?? {};
  const allOwned = [...new Set(Object.values(owned).flat())];

  const [state, setState] = useQueryStates({
    [queryKey]: parseAsStringLiteral(values).withDefault(
      defaultValue ?? values[0],
    ),
    ...Object.fromEntries(allOwned.map((key) => [key, parseAsString])),
  });

  function selectTab(next: string) {
    const keep = new Set(owned[next] ?? []);
    // Clearing on the switch rather than on unmount: React's development
    // double-mount would run an unmount cleanup once on load and wipe a value
    // the URL legitimately arrived with.
    setState({
      [queryKey]: next,
      ...Object.fromEntries(
        allOwned.filter((key) => !keep.has(key)).map((key) => [key, null]),
      ),
    });
  }

  const active = state[queryKey];

  return (
    <Tabs
      value={typeof active === "string" ? active : (defaultValue ?? values[0])}
      onValueChange={selectTab}
      {...props}
    >
      {children}
    </Tabs>
  );
}

/**
 * A tab strip that wraps instead of running off the screen.
 *
 * Nine tabs come to about 600px, which pushes a phone's whole document
 * sideways. Scrolling the strip fixes that but leaves the last tab clipped at
 * the edge with nothing saying it is there. Wrapping shows every tab at once
 * and costs a second line, which is the better trade on a small screen.
 *
 * `h-auto` is needed because the strip is a fixed 32px tall by default, sized
 * for exactly one row.
 */
export function QueryTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        // Two things fight wrapping. The strip is `h-8` under a
        // `group-data-horizontal` variant, which a plain `h-auto` cannot
        // override — so the second row spilled over the content below. And a
        // trigger is `h-[calc(100%-1px)]`, the strip's height, which across
        // two rows stretches each one over both.
        "group-data-horizontal/tabs:h-auto max-w-full flex-wrap justify-start gap-0.5 [&>button]:h-7",
        className,
      )}
      {...props}
    />
  );
}
