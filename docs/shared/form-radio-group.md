# Form Radio Group

<!-- notes -->
One of several, all visible at once.

Each option is the selectable card from the Field docs: the whole row is the
label, so the hit target is the card and not just the dot.
<!-- /notes -->

**Source** `src/components/shared/form-radio-group.tsx` · **Client component**

## Import

```tsx
import { FormRadioGroup } from "@/components/shared/form-radio-group";
import type { ChoiceOption } from "@/components/shared/form-radio-group";
```

## Exports

### `ChoiceOption` — type

```ts
type ChoiceOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}
```

### `FormRadioGroup` — component

One of several, all visible at once.

Each option is the selectable card from the Field docs: the whole row is the
label, so the hit target is the card and not just the dot.

```ts
FormRadioGroup<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> & {
  options: ChoiceOption[];
})
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/field`, `@/components/ui/radio-group`

## Used by

[examples/checkout-form](../examples/checkout-form.md), [shared/form-checkbox-group](../shared/form-checkbox-group.md)
