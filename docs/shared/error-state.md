# Error State

<!-- notes -->
A failure a person can act on.

Say what did not happen and what to do next. A raw status code tells them
nothing, so keep `detail` for the part they could repeat to support.
<!-- /notes -->

**Source** `src/components/shared/error-state.tsx`

## Import

```tsx
import { ErrorState } from "@/components/shared/error-state";
```

## Exports

### `ErrorState` — component

A failure a person can act on.

Say what did not happen and what to do next. A raw status code tells them
nothing, so keep `detail` for the part they could repeat to support.

```ts
ErrorState(props: {
  title?: React.ReactNode;
  description: React.ReactNode;
  /** Reference or code, shown small — useful to quote, not to read. */
  detail?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
})
```

## Depends on

- Packages: `lucide-react`, `react`
- In this project: `@/components/ui/alert`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md)
