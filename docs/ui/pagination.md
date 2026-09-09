# Pagination

<!-- notes -->
The page strip. The page number belongs in the URL — `parseAsInteger.withDefault(1)` — so a refresh and a shared link both land on the same page.
<!-- /notes -->

**Source** `src/components/ui/pagination.tsx` · **Upstream** [pagination.md](https://ui.shadcn.com/docs/components/base/pagination.md)

## Import

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
```

## Exports

### `Pagination` — component

```ts
Pagination(props: React.ComponentProps<"nav">)
```

### `PaginationContent` — component

```ts
PaginationContent(props: React.ComponentProps<"ul">)
```

### `PaginationEllipsis` — component

```ts
PaginationEllipsis(props: React.ComponentProps<"span">)
```

### `PaginationItem` — component

```ts
PaginationItem(props: React.ComponentProps<"li">)
```

### `PaginationLink` — component

```ts
PaginationLink(props: PaginationLinkProps)
```

### `PaginationNext` — component

```ts
PaginationNext(props: React.ComponentProps<typeof PaginationLink> & { text?: string })
```

### `PaginationPrevious` — component

```ts
PaginationPrevious(props: React.ComponentProps<typeof PaginationLink> & { text?: string })
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="pagination"]`, `[data-slot="pagination-content"]`, `[data-slot="pagination-ellipsis"]`, `[data-slot="pagination-item"]`, `[data-slot="pagination-link"]`.

## Depends on

- Packages: `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/button`

## Used by

[examples/booking-panel](../examples/booking-panel.md)
