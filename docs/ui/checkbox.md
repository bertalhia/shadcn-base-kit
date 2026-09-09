# Checkbox

<!-- notes -->
One box, on or off. In a form use `FormCheckbox`; for a set of them, `FormCheckboxGroup`, which owns the array value. Base UI marks state with `data-checked` and `data-indeterminate`, not `data-state`.
<!-- /notes -->

**Source** `src/components/ui/checkbox.tsx` · **Upstream** [checkbox.md](https://ui.shadcn.com/docs/components/base/checkbox.md) · **Client component**

## Import

```tsx
import { Checkbox } from "@/components/ui/checkbox";
```

## Exports

### `Checkbox` — component

```ts
Checkbox(props: CheckboxPrimitive.Root.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="checkbox"]`, `[data-slot="checkbox-indicator"]`.

## Depends on

- Packages: `@base-ui/react/checkbox`, `cn`, `lucide-react`

## Used by

[examples/bug-report-form](../examples/bug-report-form.md), [examples/orders-table](../examples/orders-table.md), [shared/form-checkbox](../shared/form-checkbox.md), [shared/form-checkbox-group](../shared/form-checkbox-group.md)
