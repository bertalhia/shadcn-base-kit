# Empty State

<!-- notes -->
What a list shows before it has anything in it.

An empty state earns its keep by naming the next step, so `action` is the
point of the component — without one this is just an apology.
<!-- /notes -->

**Source** `src/components/shared/empty-state.tsx`

## Import

```tsx
import { EmptyState } from "@/components/shared/empty-state";
```

## Exports

### `EmptyState` — component

What a list shows before it has anything in it.

An empty state earns its keep by naming the next step, so `action` is the
point of the component — without one this is just an apology.

```ts
EmptyState(props: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
})
```

## Depends on

- Packages: `react`
- In this project: `@/components/ui/empty`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md), [examples/orders-table](../examples/orders-table.md)
