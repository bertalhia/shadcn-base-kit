# Loading State

<!-- notes -->
Placeholder rows shaped like the content that is coming.

Skeletons beat a spinner wherever the layout is known, because the page stops
jumping when the data lands.
<!-- /notes -->

**Source** `src/components/shared/loading-state.tsx`

## Import

```tsx
import { LoadingRows, LoadingState } from "@/components/shared/loading-state";
```

## Exports

### `LoadingRows` — component

Placeholder rows shaped like the content that is coming.

Skeletons beat a spinner wherever the layout is known, because the page stops
jumping when the data lands.

```ts
LoadingRows(props: {
  rows?: number;
  className?: string;
})
```

### `LoadingState` — component

For waits with no shape to imitate, like a submit in flight.

```ts
LoadingState(props: {
  label?: string;
  className?: string;
})
```

## Depends on

- Packages: `cn`
- In this project: `@/components/ui/skeleton`, `@/components/ui/spinner`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md)
