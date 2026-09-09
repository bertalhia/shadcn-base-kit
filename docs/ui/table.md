# Table

<!-- notes -->
The bare table elements. For anything with sorting, paging or column visibility, use `data-table` instead of rebuilding them. A table is the one element allowed to scroll sideways, inside its own `overflow-x` box.
<!-- /notes -->

**Source** `src/components/ui/table.tsx` · **Upstream** [table.md](https://ui.shadcn.com/docs/components/base/table.md) · **Client component**

## Import

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
```

## Exports

### `Table` — component

```ts
Table(props: React.ComponentProps<"table">)
```

### `TableHeader` — component

```ts
TableHeader(props: React.ComponentProps<"thead">)
```

### `TableBody` — component

```ts
TableBody(props: React.ComponentProps<"tbody">)
```

### `TableFooter` — component

```ts
TableFooter(props: React.ComponentProps<"tfoot">)
```

### `TableHead` — component

```ts
TableHead(props: React.ComponentProps<"th">)
```

### `TableRow` — component

```ts
TableRow(props: React.ComponentProps<"tr">)
```

### `TableCell` — component

```ts
TableCell(props: React.ComponentProps<"td">)
```

### `TableCaption` — component

```ts
TableCaption(props: React.ComponentProps<"caption">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="table"]`, `[data-slot="table-body"]`, `[data-slot="table-caption"]`, `[data-slot="table-cell"]`, `[data-slot="table-container"]`, `[data-slot="table-footer"]`, `[data-slot="table-head"]`, `[data-slot="table-header"]`, `[data-slot="table-row"]`.

## Depends on

- Packages: `cn`, `react`

## Used by

[examples/booking-panel](../examples/booking-panel.md), [ui/data-table](../ui/data-table.md)
