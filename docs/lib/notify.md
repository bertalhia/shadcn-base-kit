# Notify

<!-- notes -->
The four things a screen says after an action, in one place.

Going through here rather than calling `toast.add` directly keeps the type
icons consistent, and keeps errors at high priority so they outlive the
success messages queued behind them.
<!-- /notes -->

**Source** `src/lib/notify.ts` · **Client component**

## Import

```tsx
import { notify } from "@/lib/notify";
```

## Exports

### `notify` — const

The four things a screen says after an action, in one place.

Going through here rather than calling `toast.add` directly keeps the type
icons consistent, and keeps errors at high priority so they outlive the
success messages queued behind them.

```ts
const notify
```

## Depends on

- In this project: `@/components/ui/toast`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/booking-panel](../examples/booking-panel.md), [examples/checkout-form](../examples/checkout-form.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/onboarding-questionnaire](../examples/onboarding-questionnaire.md), [examples/orders-table](../examples/orders-table.md), [examples/product-gallery](../examples/product-gallery.md), [examples/site-header](../examples/site-header.md)
