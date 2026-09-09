# Query Tabs

<!-- notes -->
Tabs whose active panel lives in the URL.

Which tab is open is exactly the state the nuqs rule is about: a reload
should land where you were, and a link into a filtered table is useless if
it opens on a different tab. Nested tabs get their own `queryKey`, so an
outer and an inner strip do not fight.

`parseAsStringLiteral` keeps a hand-edited URL from selecting a panel that
does not exist — anything unrecognised falls back to the default.

The page rendering this needs a `<Suspense>` boundary, since `useQueryState`
reads `useSearchParams()` underneath.
<!-- /notes -->

**Source** `src/components/shared/query-tabs.tsx` · **Client component**

## Import

```tsx
import { QueryTabs, QueryTabsList } from "@/components/shared/query-tabs";
```

## Exports

### `QueryTabs` — component

Tabs whose active panel lives in the URL.

Which tab is open is exactly the state the nuqs rule is about: a reload
should land where you were, and a link into a filtered table is useless if
it opens on a different tab. Nested tabs get their own `queryKey`, so an
outer and an inner strip do not fight.

`parseAsStringLiteral` keeps a hand-edited URL from selecting a panel that
does not exist — anything unrecognised falls back to the default.

The page rendering this needs a `<Suspense>` boundary, since `useQueryState`
reads `useSearchParams()` underneath.

```ts
QueryTabs(props: Omit<React.ComponentProps<typeof Tabs>, "value" | "onValueChange"> & {
  queryKey: string;
  values: string[];
  defaultValue?: string;
  /**
   * Which query keys belong to which tab, so leaving a tab takes its params
   * with it. Without this a nested strip's key outlives its parent and
   * `?settings=preferences` trails into a tab that has no idea what it means.
   */
  ownedKeys?: Record<string, string[]>;
})
```

### `QueryTabsList` — component

A tab strip that wraps instead of running off the screen.

Nine tabs come to about 600px, which pushes a phone's whole document
sideways. Scrolling the strip fixes that but leaves the last tab clipped at
the edge with nothing saying it is there. Wrapping shows every tab at once
and costs a second line, which is the better trade on a small screen.

`h-auto` is needed because the strip is a fixed 32px tall by default, sized
for exactly one row.

```ts
QueryTabsList(props: React.ComponentProps<typeof TabsList>)
```

## Depends on

- Packages: `cn`, `nuqs`, `react`
- In this project: `@/components/ui/tabs`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/scenario-tabs](../examples/scenario-tabs.md)
