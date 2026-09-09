# Radio Group

<!-- notes -->
One choice out of a visible few. In a form, `FormRadioGroup`. Past about six options a `Select` or a `Combobox` reads better.
<!-- /notes -->

**Source** `src/components/ui/radio-group.tsx` · **Upstream** [radio-group.md](https://ui.shadcn.com/docs/components/base/radio-group.md) · **Client component**

## Import

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
```

## Exports

### `RadioGroup` — component

```ts
RadioGroup(props: RadioGroupPrimitive.Props)
```

### `RadioGroupItem` — component

```ts
RadioGroupItem(props: RadioPrimitive.Root.Props)
```

## Data slots

Style against these rather than adding a class of your own: `[data-slot="radio-group"]`, `[data-slot="radio-group-indicator"]`, `[data-slot="radio-group-item"]`.

## Depends on

- Packages: `@base-ui/react/radio`, `@base-ui/react/radio-group`, `cn`

## Used by

[shared/form-radio-group](../shared/form-radio-group.md)
