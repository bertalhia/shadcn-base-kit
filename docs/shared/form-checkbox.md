# Form Checkbox

<!-- notes -->
A single boolean.

Laid out horizontally with the control first, which is what the Field docs
prescribe for checkboxes and switches — the label reads as the thing being
turned on, not as a heading above it.
<!-- /notes -->

**Source** `src/components/shared/form-checkbox.tsx` · **Client component**

## Import

```tsx
import { FormCheckbox } from "@/components/shared/form-checkbox";
```

## Exports

### `FormCheckbox` — component

A single boolean.

Laid out horizontally with the control first, which is what the Field docs
prescribe for checkboxes and switches — the label reads as the thing being
turned on, not as a heading above it.

```ts
FormCheckbox<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName>)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/checkbox`, `@/components/ui/field`

## Used by

[examples/checkout-form](../examples/checkout-form.md)
