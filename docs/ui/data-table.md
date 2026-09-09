# Data Table

<!-- notes -->
The table recipe over `@tanstack/react-table` v9 — `tableFeatures()` and `useTable`, not the v8 API. Sorting, paging and column visibility go through nuqs, so pass `queryKey` and mount it inside `<Suspense>`. There is no registry item for this file; the CLI never touches it.
<!-- /notes -->

**Source** `src/components/ui/data-table.tsx` · **Upstream** [data-table.md](https://ui.shadcn.com/docs/components/base/data-table.md) · **Client component**

## Import

```tsx
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  features,
} from "@/components/ui/data-table";
import type { DataTableFeatures } from "@/components/ui/data-table";
```

## Exports

### `DataTable` — component

Sorting, filters, page, page size, hidden columns and selection live in the
URL, so a reload or a shared link lands on the same view.

Two tables on one page need distinct `queryPrefix` values.

```ts
DataTable<TData extends RowData>(props: React.ComponentProps<"div"> & {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
  /** Rendered above the table, with the table instance for filters and view options. */
  toolbar?: (table: ReactTable<DataTableFeatures, TData>) => React.ReactNode;
  /** Namespaces the query keys, e.g. `orders` gives `?orders_page=2`. */
  queryPrefix?: string;
  pagination?: boolean;
  emptyMessage?: React.ReactNode;
})
```

### `DataTableColumnHeader` — component

Sort and hide a column from its header cell.

```ts
DataTableColumnHeader<TData extends RowData, TValue>(props: React.ComponentProps<"div"> & {
  column: Column<DataTableFeatures, TData, TValue>;
  title: string;
})
```

### `DataTableFeatures` — type

```ts
type DataTableFeatures = typeof features
```

### `DataTablePagination` — component

Page size, page count, selection count, and the page buttons.

```ts
DataTablePagination<TData extends RowData>(props: React.ComponentProps<"div"> & {
  table: ReactTable<DataTableFeatures, TData>;
  pageSizeOptions?: number[];
})
```

### `DataTableViewOptions` — component

Toggle column visibility.

```ts
DataTableViewOptions<TData extends RowData>(props: {
  table: ReactTable<DataTableFeatures, TData>;
  label?: React.ReactNode;
  className?: string;
})
```

### `features` — const

```ts
const features
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="data-table"]`, `[data-slot="data-table-pagination"]`.

## Depends on

- Packages: `@tanstack/react-table`, `cn`, `lucide-react`, `nuqs`, `react`
- In this project: `@/components/shared/menu-section`, `@/components/ui/button`, `@/components/ui/dropdown-menu`, `@/components/ui/select`, `@/components/ui/table`, `@/lib/search-params`

## Used by

[examples/orders-table](../examples/orders-table.md)
