# Search Input

<!-- notes -->
A search box whose term lives in the URL.

Search is the textbook case for `useQueryState`: a reload keeps the results,
and the link is worth sending to someone. nuqs throttles the history writes,
so binding straight to the input is safe.

Pages using this need a `<Suspense>` boundary — `useQueryState` reads
`useSearchParams()` underneath.
<!-- /notes -->

**Source** `src/components/shared/search-input.tsx` · **Client component**

## Import

```tsx
import { SearchInput } from "@/components/shared/search-input";
```

## Exports

### `SearchInput` — component

A search box whose term lives in the URL.

Search is the textbook case for `useQueryState`: a reload keeps the results,
and the link is worth sending to someone. nuqs throttles the history writes,
so binding straight to the input is safe.

Pages using this need a `<Suspense>` boundary — `useQueryState` reads
`useSearchParams()` underneath.

```ts
SearchInput(props: {
  queryKey?: string;
  placeholder?: string;
  clearLabel?: string;
  className?: string;
})
```

## Depends on

- Packages: `lucide-react`, `nuqs`
- In this project: `@/components/ui/input-group`

## Used by

[examples/orders-table](../examples/orders-table.md)
