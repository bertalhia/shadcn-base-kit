# Orders Table

<!-- notes -->
The `data-table` recipe on a real dataset — sorting, paging, column visibility and row selection, all in the URL, with a row detail in a sheet and a destructive action behind a confirm dialog.
<!-- /notes -->

**Source** `src/components/examples/orders-table.tsx` · **Client component**

## Import

```tsx
import { OrdersTable } from "@/components/examples/orders-table";
```

## Exports

### `OrdersTable` — component

The orders list.

Sorting, filters, page, page size, hidden columns and selection all live in
the URL, so a reload lands on the same view and the link is worth sending to
someone. `queryPrefix` namespaces them, which is what lets a second table
share the page.

```ts
OrdersTable()
```

## Depends on

- Packages: `@tanstack/react-table`, `lucide-react`, `nuqs`, `react`
- In this project: `@/components/shared/confirm-dialog`, `@/components/shared/empty-state`, `@/components/shared/menu-section`, `@/components/shared/search-input`, `@/components/shared/section`, `@/components/ui/badge`, `@/components/ui/button`, `@/components/ui/checkbox`, `@/components/ui/data-table`, `@/components/ui/date-picker`, `@/components/ui/dropdown-menu`, `@/components/ui/sheet`, `@/lib/date`, `@/lib/notify`, `@/utils/number`
