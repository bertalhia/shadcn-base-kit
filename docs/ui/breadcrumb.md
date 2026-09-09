# Breadcrumb

<!-- notes -->
The trail back up. Below `sm` the full trail wraps onto three lines, so collapse the ancestors into `BreadcrumbEllipsis` — this is one of the failures that shipped from this project before.
<!-- /notes -->

**Source** `src/components/ui/breadcrumb.tsx` · **Upstream** [breadcrumb.md](https://ui.shadcn.com/docs/components/base/breadcrumb.md)

## Import

```tsx
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
```

## Exports

### `Breadcrumb` — component

```ts
Breadcrumb(props: React.ComponentProps<"nav">)
```

### `BreadcrumbList` — component

```ts
BreadcrumbList(props: React.ComponentProps<"ol">)
```

### `BreadcrumbItem` — component

```ts
BreadcrumbItem(props: React.ComponentProps<"li">)
```

### `BreadcrumbLink` — component

```ts
BreadcrumbLink(props: useRender.ComponentProps<"a">)
```

### `BreadcrumbPage` — component

```ts
BreadcrumbPage(props: React.ComponentProps<"span">)
```

### `BreadcrumbSeparator` — component

```ts
BreadcrumbSeparator(props: React.ComponentProps<"li">)
```

### `BreadcrumbEllipsis` — component

```ts
BreadcrumbEllipsis(props: React.ComponentProps<"span">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="breadcrumb"]`, `[data-slot="breadcrumb-ellipsis"]`, `[data-slot="breadcrumb-item"]`, `[data-slot="breadcrumb-list"]`, `[data-slot="breadcrumb-page"]`, `[data-slot="breadcrumb-separator"]`.

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `cn`, `lucide-react`, `react`

## Used by

[examples/release-notes](../examples/release-notes.md), [examples/site-header](../examples/site-header.md)
