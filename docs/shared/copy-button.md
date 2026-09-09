# Copy Button

<!-- notes -->
Copies a value and says so.

The confirmation is the point — without it people click twice, unsure it
worked. The icon returns to its resting state after two seconds.
<!-- /notes -->

**Source** `src/components/shared/copy-button.tsx` · **Client component**

## Import

```tsx
import { CopyButton } from "@/components/shared/copy-button";
```

## Exports

### `CopyButton` — component

Copies a value and says so.

The confirmation is the point — without it people click twice, unsure it
worked. The icon returns to its resting state after two seconds.

```ts
CopyButton(props: Omit<React.ComponentProps<typeof Button>, "onClick" | "value"> & {
  value: string;
  label?: string;
  copiedLabel?: string;
})
```

## Depends on

- Packages: `lucide-react`, `react`
- In this project: `@/components/ui/button`, `@/components/ui/tooltip`

## Used by

[examples/feedback-playground](../examples/feedback-playground.md)
