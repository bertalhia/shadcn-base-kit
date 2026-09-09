# Stat Card

<!-- notes -->
One number, with the context that makes it mean something.

A figure on its own says nothing; `change` is what turns it into a signal.
Direction is spelled out in the badge text rather than left to colour alone.
<!-- /notes -->

**Source** `src/components/shared/stat-card.tsx`

## Import

```tsx
import { StatCard } from "@/components/shared/stat-card";
```

## Exports

### `StatCard` — component

One number, with the context that makes it mean something.

A figure on its own says nothing; `change` is what turns it into a signal.
Direction is spelled out in the badge text rather than left to colour alone.

```ts
StatCard(props: {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Fraction, not percent: 0.124 renders as 12.4%. */
  change?: number;
  hint?: React.ReactNode;
  className?: string;
})
```

## Depends on

- Packages: `cn`, `lucide-react`, `react`
- In this project: `@/components/ui/badge`, `@/components/ui/card`, `@/utils/number`

## Used by

[examples/revenue-dashboard](../examples/revenue-dashboard.md)
