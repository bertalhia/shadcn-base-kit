# Form Input

<!-- notes -->
Single-line text. The default field, and the one most forms are made of.
<!-- /notes -->

**Source** `src/components/shared/form-input.tsx` · **Client component**

## Import

```tsx
import { FormInput } from "@/components/shared/form-input";
```

## Exports

### `FormInput` — component

Single-line text. The default field, and the one most forms are made of.

```ts
FormInput<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: BaseFieldProps<TFieldValues, TName> &
  Omit<React.ComponentProps<typeof Input>, "name" | "form">)
```

## Depends on

- Packages: `react-hook-form`
- In this project: `@/components/shared/form-field`, `@/components/ui/input`

## Used by

[examples/account-settings](../examples/account-settings.md), [examples/checkout-form](../examples/checkout-form.md)
