# Form Slider

<!-- notes -->
A number picked from a range.

A slider gives no feedback about the value it holds, so pair it with a
description that shows the current number.
<!-- /notes -->

**Source** `src/components/shared/form-slider.tsx` · **Client component**

## Import

```tsx
import { FormSlider } from "@/components/shared/form-slider";
```

## Exports

### `FormSlider` — component

A number picked from a range.

A slider gives no feedback about the value it holds, so pair it with a
description that shows the current number.

```ts
FormSlider<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<
    React.ComponentProps<typeof Slider>,
    "value" | "onValueChange" | "name"
  >)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/slider`

## Used by

[examples/account-settings](../examples/account-settings.md)
