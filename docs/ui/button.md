# Button

<!-- notes -->
Every clickable thing that is not a link, and — through `render` — links that look like buttons. Base UI takes `render={<Link href="/x" />}` where Radix took `asChild`. An icon inside wants `data-icon="inline-start"` or `data-icon="inline-end"`, which is what tightens the padding on that side.
<!-- /notes -->

**Source** `src/components/ui/button.tsx` · **Upstream** [button.md](https://ui.shadcn.com/docs/components/base/button.md)

## Import

```tsx
import { Button, buttonVariants } from "@/components/ui/button";
```

## Exports

### `Button` — component

```ts
Button(props: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>)
```

### `buttonVariants` — variants

```ts
const buttonVariants
```

| Variant | Options | Default |
| --- | --- | --- |
| `variant` | `default` `outline` `secondary` `ghost` `destructive` `link` | `default` |
| `size` | `default` `xs` `sm` `lg` `icon` `icon-xs` `icon-sm` `icon-lg` | `default` |

## Data slots

Style against these rather than adding a class of your own: `[data-slot="button"]`.

## Depends on

- Packages: `@base-ui/react/button`, `class-variance-authority`, `cn`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/booking-panel](../examples/booking-panel.md), [examples/bug-report-form](../examples/bug-report-form.md), [examples/checkout-form](../examples/checkout-form.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/onboarding-questionnaire](../examples/onboarding-questionnaire.md), [examples/orders-table](../examples/orders-table.md), [examples/product-gallery](../examples/product-gallery.md), and 21 more
