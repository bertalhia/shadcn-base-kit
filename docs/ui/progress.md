# Progress

<!-- notes -->
A determinate bar. `ProgressLabel` and `ProgressValue` are the accessible text; for work with no known end, use `spinner`.
<!-- /notes -->

**Source** `src/components/ui/progress.tsx` · **Upstream** [progress.md](https://ui.shadcn.com/docs/components/base/progress.md) · **Client component**

## Import

```tsx
import {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";
```

## Exports

### `Progress` — component

```ts
Progress(props: ProgressPrimitive.Root.Props)
```

### `ProgressTrack` — component

```ts
ProgressTrack(props: ProgressPrimitive.Track.Props)
```

### `ProgressIndicator` — component

```ts
ProgressIndicator(props: ProgressPrimitive.Indicator.Props)
```

### `ProgressLabel` — component

```ts
ProgressLabel(props: ProgressPrimitive.Label.Props)
```

### `ProgressValue` — component

```ts
ProgressValue(props: ProgressPrimitive.Value.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="progress"]`, `[data-slot="progress-indicator"]`, `[data-slot="progress-label"]`, `[data-slot="progress-track"]`, `[data-slot="progress-value"]`.

## Depends on

- Packages: `@base-ui/react/progress`, `cn`

## Used by

[examples/checkout-form](../examples/checkout-form.md), [examples/feedback-playground](../examples/feedback-playground.md), [examples/revenue-dashboard](../examples/revenue-dashboard.md)
