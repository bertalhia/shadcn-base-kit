# Section

<!-- notes -->
A titled block within a page, so screens stack the same way.
<!-- /notes -->

**Source** `src/components/shared/section.tsx`

## Import

```tsx
import { Section } from "@/components/shared/section";
```

## Exports

### `Section` — component

A titled block within a page, so screens stack the same way.

```ts
Section(props: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
})
```

## Depends on

- Packages: `cn`, `react`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/booking-panel](../examples/booking-panel.md), [examples/checkout-form](../examples/checkout-form.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/orders-table](../examples/orders-table.md), [examples/product-gallery](../examples/product-gallery.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md)
