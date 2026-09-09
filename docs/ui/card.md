# Card

<!-- notes -->
A titled block of content. `CardAction` is the slot on the right of the header, which is where a menu or a link belongs rather than floated inside `CardTitle`.
<!-- /notes -->

**Source** `src/components/ui/card.tsx` · **Upstream** [card.md](https://ui.shadcn.com/docs/components/base/card.md)

## Import

```tsx
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
```

## Exports

### `Card` — component

```ts
Card(props: React.ComponentProps<"div"> & { size?: "default" | "sm" })
```

### `CardHeader` — component

```ts
CardHeader(props: React.ComponentProps<"div">)
```

### `CardFooter` — component

```ts
CardFooter(props: React.ComponentProps<"div">)
```

### `CardTitle` — component

```ts
CardTitle(props: React.ComponentProps<"div">)
```

### `CardAction` — component

```ts
CardAction(props: React.ComponentProps<"div">)
```

### `CardDescription` — component

```ts
CardDescription(props: React.ComponentProps<"div">)
```

### `CardContent` — component

```ts
CardContent(props: React.ComponentProps<"div">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="card"]`, `[data-slot="card-action"]`, `[data-slot="card-content"]`, `[data-slot="card-description"]`, `[data-slot="card-footer"]`, `[data-slot="card-header"]`, `[data-slot="card-title"]`.

## Depends on

- Packages: `cn`, `react`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md), [shared/stat-card](../shared/stat-card.md)
