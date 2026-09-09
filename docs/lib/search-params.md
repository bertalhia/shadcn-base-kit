# Search Params

<!-- notes -->
Every nuqs parser this project uses, declared once and imported from `nuqs/server`. The same object feeds `useQueryStates` on the client, `createLoader` in a server component and `createSerializer` when building a link.
<!-- /notes -->

**Source** `src/lib/search-params.ts`

## Import

```tsx
import {
  dataTableSearchParams,
  dataTableUrlKeys,
  loadDataTableSearchParams,
  serializeDataTableSearchParams,
  parseAsColumnFilter,
  parseAsSort,
} from "@/lib/search-params";
import type { DataTableSearchParams } from "@/lib/search-params";
```

## Exports

### `dataTableSearchParams` — const

Every piece of `<DataTable />` state that survives a reload.

`page` is one-based in the URL and zero-based in state, which is what
`parseAsIndex` does. `hidden` and `selected` carry ids, so the URL stays
short when nothing is hidden and nothing is selected.

```ts
const dataTableSearchParams
```

### `DataTableSearchParams` — type

```ts
type DataTableSearchParams = typeof dataTableSearchParams
```

### `dataTableUrlKeys` — function

Prefixed URL keys, so two tables on the same page don't fight over `?page`.

```ts
useQueryStates(dataTableSearchParams, {
  urlKeys: dataTableUrlKeys("orders"),
})
// → ?orders_page=2&orders_sort=total:desc
```

```ts
dataTableUrlKeys(prefix: string)
```

### `loadDataTableSearchParams` — const

Read table state in a server component or route handler.

```ts
const loadDataTableSearchParams
```

### `serializeDataTableSearchParams` — const

Build a link that opens the table on a given page, sort, or filter.

```ts
const serializeDataTableSearchParams
```

### `parseAsColumnFilter` — const

One TanStack Table column filter.

`?filters=email:acme` <=> `{ id: "email", value: "acme" }`

Values land as strings, which is what the `includesString` filter expects.
For a filter that carries structured data, reach for `parseAsJson` instead.

```ts
const parseAsColumnFilter
```

### `parseAsSort` — const

One TanStack Table sort entry.

`?sort=email:desc` <=> `{ id: "email", desc: true }`

```ts
const parseAsSort
```

## Depends on

- Packages: `nuqs/server`

## Used by

[ui/data-table](../ui/data-table.md)
