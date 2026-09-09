# Label

<!-- notes -->
The label element. Inside a form it comes from `FieldLabel`, which is already tied to the control's id by `shared/form-field`.
<!-- /notes -->

**Source** `src/components/ui/label.tsx` · **Upstream** [label.md](https://ui.shadcn.com/docs/components/base/label.md) · **Client component**

## Import

```tsx
import { Label } from "@/components/ui/label";
```

## Exports

### `Label` — component

```ts
Label(props: React.ComponentProps<"label">)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="label"]`.

## Depends on

- Packages: `cn`, `react`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/feedback-playground](../examples/feedback-playground.md), [ui/field](../ui/field.md)
