# Badge

<!-- notes -->
A short static label — a status, a count, a tag. It is not a button: if it can be clicked, it is a `Button` with `size="xs"`.
<!-- /notes -->

**Source** `src/components/ui/badge.tsx` · **Upstream** [badge.md](https://ui.shadcn.com/docs/components/base/badge.md)

## Import

```tsx
import { Badge, badgeVariants } from "@/components/ui/badge";
```

## Exports

### `Badge` — component

```ts
Badge(props: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>)
```

### `badgeVariants` — variants

```ts
const badgeVariants
```

| Variant | Options | Default |
| --- | --- | --- |
| `variant` | `default` `secondary` `destructive` `outline` `ghost` `link` | `default` |

## Depends on

- Packages: `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `cn`

## Used by

[examples/booking-panel](../examples/booking-panel.md), [examples/checkout-form](../examples/checkout-form.md), [examples/orders-table](../examples/orders-table.md), [examples/product-gallery](../examples/product-gallery.md), [examples/release-notes](../examples/release-notes.md), [shared/stat-card](../shared/stat-card.md)
