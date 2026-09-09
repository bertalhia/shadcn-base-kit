# State lives in the URL

`NuqsAdapter` is already mounted in `src/app/layout.tsx`.

**State a person changes and expects to find again belongs in the URL, not in `useState`.** Filters, search, the active tab, sorting, the page, a date range, the row opened in a detail panel: all of it survives a refresh and fits in a shared link.

```tsx
const [query, setQuery] = useQueryState("q", parseAsString.withDefault(""));
```

When several keys move together, `useQueryStates` writes to the URL once.

## What stays in `useState`

- Transient open/close state: popover, tooltip, dropdown, menu. Persisting it reopens the popover on reload and floods the Back history.
- Field values in an open form — React Hook Form owns those. A draft does not go in the URL.

A useful line: if the link would make no sense pasted into someone else's chat, it is `useState`.

## `useSearchParams` forces a Suspense boundary

`useQueryState` calls `useSearchParams()` underneath. In the app router that opts the page out of static prerendering unless the caller sits inside `<Suspense>` — the build fails with _"useSearchParams() should be wrapped in a suspense boundary"_, and only at prerender time, so `next dev` will not warn you.

Two consequences:

- A page rendering [`DataTable`](../ui/data-table.md), or any picker with a `queryKey`, wraps it in `<Suspense>`.
- A component that only _optionally_ reads the URL must not call the hook unconditionally and branch on the result — that drags the boundary into every caller. Mount the nuqs hook in its own child component and render it only when the key is there. [`date-picker.tsx`](../ui/date-picker.md) does this with `DateValue` / `QueryDate` / `LocalDate`.

## Conventions

- Always pass an explicit parser: `parseAsInteger`, `parseAsIsoDate`, `parseAsArrayOf`, `parseAsStringLiteral`. Without one, everything comes back as a string.
- `.withDefault(...)` kills the `null` on read and keeps the URL clean — the default value is never written.
- Declare parsers in [`src/lib/search-params.ts`](../lib/search-params.md), importing from `nuqs/server`. The same object feeds `useQueryStates` on the client, `createLoader` in a server component, and `createSerializer` when building links.
- A reusable component takes its key as a prop (`queryKey`, `queryPrefix`) — never hardcode the key inside, or two instances on one page fight over it. [`DataTable`](../ui/data-table.md) and [`QueryTabs`](../shared/query-tabs.md) do this.
- `history: "push"` only where the change is real navigation — a tab, a modal. The `replace` default preserves the Back button.
- `parseAsStringLiteral` keeps a hand-edited URL from selecting something that does not exist; anything unrecognised falls back to the default.
- A URL past about 2,000 characters is a sign that the state did not belong in the URL.

## Docs

Every page on nuqs.dev has a markdown twin: append `.md` to the URL.
